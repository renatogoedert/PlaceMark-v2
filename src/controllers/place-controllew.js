import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placeController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const viewData = {
        title: "Edit place",
        placemark: placemark,
        place: place,
      };
      return h.view("place-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("place-view", { title: "Edit place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const newPlace = {
        name: request.payload.name,
        des: request.payload.des,
        lat: Number(request.payload.duration),
        lon: Number(request.payload.duration),
      };
      await db.placeStore.updatePlace(place, newPlace);
      return h.redirect(`/placemark/${request.params.id}`);
    },
  },
};