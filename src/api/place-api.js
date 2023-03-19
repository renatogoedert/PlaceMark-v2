// Code Developed By Renato
// email:20099697@mail.wit.ie

import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlaceSpec, PlaceSpecPlus, PlaceArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

// api for places class
export const placeApi = {

  // find all method with jws validation and openAPI doc
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const places = await db.placeStore.getAllPlaces();
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlaceArraySpec, failAction: validationError },
    description: "Get all placeApi",
    notes: "Returns all placeApi",
  },

  // find method with jws validation and openAPI doc
  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No place with this id");
        }
        return place;
      } catch (err) {
        return Boom.serverUnavailable("No place with this id");
      }
    },
    tags: ["api"],
    description: "Find a Place",
    notes: "Returns a place",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  // create method with jws validation and openAPI doc
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.addPlace(request.params.id, request.payload);
        if (place) {
          return h.response(place).code(201);
        }
        return Boom.badImplementation("error creating place");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a place",
    notes: "Returns the newly created place",
    validate: { payload: PlaceSpec },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  // delete all method with jws validation and openAPI doc
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placeStore.deleteAllPlaces();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placeApi",
  },

  // delete method with jws validation and openAPI doc
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        await db.placeStore.deletePlace(place._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
  },
  tags: ["api"],
    description: "Delete a place",
    validate: { params: { id: IdSpec }, failAction: validationError },
};
