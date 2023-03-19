// Code Developed By Renato
// email:20099697@mail.wit.ie

import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// starting json database
const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

// store for places in json db
export const placeJsonStore = {
  // method to find all places
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  // method to add an place
  async addPlace(placemarkId, place) {
    await db.read();
    place._id = v4();
    place.placemarkid = placemarkId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  // method to find one place using placemarkid
  async getPlaceByPlacemarkId(id) {
    await db.read();
    return db.data.places.filter((place) => place.placemarkid === id);
  },

  // method to get an place using id
  async getPlaceById(id) {
    await db.read();
    let placeData = db.data.places.find((place) => place._id === id);
    if (placeData === undefined) placeData = null;
    return placeData;
  },

  // method to delete an place using id
  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    if (index !== -1) db.data.places.splice(index, 1);
    await db.write();
  },

  // method to delete all place
  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  // method to update an place
  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.lat = updatedPlace.lat;
    place.lon = updatedPlace.lon;
    place.des = updatedPlace.des;
    place.img = updatedPlace.img;
    await db.write();
  },
};
