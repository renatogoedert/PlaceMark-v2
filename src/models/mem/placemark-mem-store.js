// Code Developed By Renato
// email:20099697@mail.wit.ie

import { v4 } from "uuid";
import { placeMemStore } from "./place-mem-store.js";

let placemarks = [];

// store for placemarks 
export const placemarkMemStore = {
  // method to find all placemarks
  async getAllPlacemarks() {
    return placemarks;
  },

  // method to add an placemark
  async addPlacemark(placemark) {
    placemark._id = v4();
    placemarks.push(placemark);
    return placemark;
  },

  // method to find one placemark using id
  async getPlacemarkById(id) {
    const list = placemarks.find((placemark) => placemark._id === id);
    if (list) {
      list.places = await placeMemStore.getPlacesByPlacemarkId(list._id);
      return list;
    }
    return null;
  },

  // method to delete an placemark using id
  async deletePlacemarkById(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  // method to delete all placemark
  async deleteAllPlacemarks() {
    placemarks = [];
  },

  // method to update an placemark
  async getUserPlacemarks(userid) {
    return placemarks.filter((placemark) => placemark.userid === userid);
  },

};
