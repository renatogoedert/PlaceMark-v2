// Code Developed By Renato
// email:20099697@mail.wit.ie

import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { placeJsonStore } from "./place-json-store.js";

// starting json database
const db = new Low(new JSONFile("./src/models/json/placemarks.json"));
db.data = { placemarks: [] };

// store for placemarks in json db
export const placemarkJsonStore = {
  // method to find all placemarks
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  // method to add an placemark
  async addPlacemark(placemark) {
    await db.read();
    placemark._id = v4();
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  // method to find one placemark using id
  async getPlacemarkById(id) {
    await db.read();
    let list = db.data.placemarks.find((placemark) => placemark._id === id);
    if (list) {
      list.places = await placeJsonStore.getPlaceByPlacemarkId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  // method to get an placemark using userid
  async getUserPlacemarks(userid) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.userid === userid);
  },

  // method to delete an placemark using id
  async deletePlacemarkById(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  // method to delete all placemark
  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },
};
