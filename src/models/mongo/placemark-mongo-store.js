// Code Developed By Renato
// email:20099697@mail.wit.ie

import { Placemark } from "./placemark.js";
import { placeMongoStore } from "./place-mongo-store.js";

// store for placemarks in mongo db
export const placemarkMongoStore = {
  // method to find all placemarks
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  // method to find one placemark using id
  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      if (placemark) {
        placemark.places = await placeMongoStore.getPlacesByPlacemarkId(placemark._id);
      }
      return placemark;
    }
    return null;
  },

  // method to find one placemark using id
  async getPlacemarkByName(name) {
    if (name) {
      const placemark = await Placemark.findOne({ name: name }).lean();
      if (placemark) {
        placemark.places = await placeMongoStore.getPlacesByPlacemarkId(placemark._id);
      }
      return placemark;
    }
    return null;
  },

  // method to find one placemark using id
  async getUserFavouritePlacemark(id) {
  if (id) {
    const placemark = await Placemark.findOne({ userid: id, isFavourite: true }).lean();
    return placemark;
  }
  return null;
  },

  // method to add an placemark
  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  // method to get an placemark using userid
  async getUserPlacemarks(id) {
    if (id) {
      const placemark = await Placemark.find({ userid: id }).lean();
      return placemark;
    }
    return null;
  },

  // method to delete an placemark using id
  async deletePlacemarkById(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all placemark
  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  // method to update an placemark
  async updatePlacemark(updatedPlacemark) {
    if (updatedPlacemark) {
      const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
      placemark.name = updatedPlacemark.name;
      placemark.img = updatedPlacemark.img;
      await placemark.save();
    }
    return null;
  },
};
