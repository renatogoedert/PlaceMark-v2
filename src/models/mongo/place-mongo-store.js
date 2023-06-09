// Code Developed By Renato
// email:20099697@mail.wit.ie

import { Place } from "./place.js";
import { reviewMongoStore } from "./review-mongo-store.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";
import { discussionMongoStore } from "./discussion-mongo-store.js";

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

  async getPublicPlaces() {
    const places = await Place.find({ isPublic: true }).lean();
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
      if (place) {
        place.reviews = await reviewMongoStore.getReviewsByPlaceId(place._id);
        place.discussions = await discussionMongoStore.getDiscussionsByPlaceId(place._id);
      }
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
    if (updatedPlace) {
      const place = await Place.findOne({ _id: updatedPlace._id });
      place.name = updatedPlace.name;
      place.lat = updatedPlace.lat;
      place.lon = updatedPlace.lon;
      place.des = updatedPlace.des;
      place.img = updatedPlace.img;
      await place.save();
    }
  return null;
  },

};