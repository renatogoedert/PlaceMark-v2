import { Place } from "./place.js";

export const placeMongoStore = {
  async getPlacesByPlacemarkId(id) {
    const places = await Place.find({ placemarkid: id }).lean();
    return places;
  },
};
