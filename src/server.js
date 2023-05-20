// Code Developed By Renato
// email:20099697@mail.wit.ie

import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Bell from "@hapi/bell";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Joi from "joi";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { apiRoutes } from "./api-routes.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// starting .env
const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

// creating helper for handlebars
Handlebars.registerHelper("ifCond", function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// setting swwagger
const swaggerOptions = {
  info: {
    title: "Placemark API",
    version: "0.1"
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};

// initialising the server
async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,    
  });

  // registering in the server dependencies
  await server.register(Vision);
  await server.register(Bell);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register(jwt);
  server.validator(Joi);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  // setting cookie session strategies
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });

  var bellAuthOptions = {
    provider: 'github',
    password: 'github-encryption-password-secure',
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
    isSecure: false 
  };

  server.auth.strategy('github-oauth', 'bell', bellAuthOptions);

  // setting jew strategies
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });

  // setting default autentification
  server.auth.default("session");

  // setting front-end paths and engines
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  
  // initializationg prefereble database
  db.init("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
