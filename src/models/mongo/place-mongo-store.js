// Code Developed By Renato
// email:20099697@mail.wit.ie

import { Place } from "./place.js";
import { Placemark } from "./placemark.js";

// store for places in mongo db
export const placeMongoStore = {
  // method to find all places 
  async getAllPlaces() {
    const places = await Place.find().lean();
    return places;
  },

  // method to find one place using placemarkid
  async getPlacesByPlacemarkId(id) {
    const places = await Place.find({ placemarkid: id }).lean();
    return places;
  },

  // method to add an place
  async addPlace(placemarkId, place) {
    place.placemarkid = placemarkId;
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  // method to get an place using id
  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      return place;
    }
    return null;
  },

  // method to delete an place using id
  async deletePlace(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all place
  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  // method to update an place
  async updatePlace(updatedPlace) {
    const place = await Place.findOne({ _id: updatedPlace._id });
    place.name = updatedPlace.name;
    place.lat = updatedPlace.lat;
    place.lon = updatedPlace.lon;
    place.des = updatedPlace.des;
    place.img = updatedPlace.img;
    await place.save();
  },
};