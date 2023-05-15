// Code Developed By Renato
// email:20099697@mail.wit.ie

import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { placemarkController } from "./controllers/placemark-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { adminDashboardController } from "./controllers/admin-dashboard-controller.js";
import { placeController } from "./controllers/place-controller.js";
import { publicController } from "./controllers/public-controller.js";

// routes for webapp
export const webRoutes = [
  // routes for accounts
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  // routes for dashboard
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplacemark", config: dashboardController.addPlacemark },
  { method: "GET", path: "/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark },

  // routes for about
  { method: "GET", path: "/about", config: aboutController.index },

  // routes for placemark
  { method: "GET", path: "/placemark/{id}", config: placemarkController.index },
  { method: "POST", path: "/placemark/{id}/addplace", config: placemarkController.addPlace },
  { method: "GET", path: "/placemark/{id}/deleteplace/{placeid}", config: placemarkController.deletePlace },
  { method: "POST", path: "/placemark/{id}/uploadimage", config: placemarkController.uploadImage },

  // routes for image
  { method: "POST", path: "/place/{id}/uploadimage", config: placeController.uploadImage },

  // routes for hanling images
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  // routes for admin
  { method: "GET", path: "/admindashboard", config: adminDashboardController.index },
  { method: "GET", path: "/adminusers", config: adminController.index },
  { method: "GET", path: "/adminusers/deleteuser/{id}", config: adminController.deleteUser },

  // routes for public
  { method: "GET", path: "/public", config: publicController.index },

  // routes for place
  { method: "GET", path: "/place/{id}", config: placeController.index },
  { method: "POST", path: "/place/{id}/addreview", config: placeController.addReview },
  { method: "GET", path: "/place/{id}/addfavourites", config: placeController.addToFavourites }
];
