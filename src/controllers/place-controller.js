// Code Developed By Renato
// email:20099697@mail.wit.ie

import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { ReviewSpec } from "../models/joi-schemas.js";

// controller to render index view
export const placeController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const viewData = {
        title: "Place",
        place: place,
      };
      return h.view("place-view", viewData);
    },
  },

    // method to add one place with validation
    addReview: {
      validate: {
        payload: ReviewSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("placemark-view", { title: "Add place error", errors: error.details }).takeover().code(400);
        },
      },
      handler: async function (request, h) {
        const place = await db.placeStore.getPlaceById(request.params.id);
        const newReview = {
          name: request.payload.name,
          rating: Number(request.payload.rating),
          fullReview: request.payload.fullReview,
          postAt: new Date(),
        };
        await db.reviewStore.addReview(place._id, newReview);
        return h.redirect(`/place/${place._id}`);
      },
    },
 
  // method to upload a image in cloudinary
  uploadImage: {
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          place.img = url;
          await db.placeStore.updatePlace(place);
        }
        return h.redirect(`/dashboard`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/dashboard`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};