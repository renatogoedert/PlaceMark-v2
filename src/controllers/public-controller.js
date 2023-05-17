// Code Developed By Renato
// email:20099697@mail.wit.ie

// controller to render public places view
import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const publicController = {
  index: {
    handler: async function (request, h) {
      const places= await db.placeStore.getPublicPlaces();
      const viewData = {
        title: "Public placemarks",
        places: places,
      };
      return h.view("public-view", viewData);
    },
  },
}