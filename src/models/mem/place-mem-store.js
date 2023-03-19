// Code Developed By Renato
// email:20099697@mail.wit.ie

import { v4 } from "uuid";

let places = [];

// store for places
export const placeMemStore = {
  // method to find all places 
  async getAllPlaces() {
    return places;
  },

  // method to add an place
  async addPlace(placemarkId, place) {
    place._id = v4();
    place.placemarkid = placemarkId;
    places.push(place);
    return place;
  },

  // method to find one place using placemarkid
  async getPlacesByPlacemarkId(id) {
    return places.filter((place) => place.placemarkid === id);
  },

  // method to get an place using id
  async getPlaceById(id) {
    let place = places.find((place) => place._id === id);
    if (place === undefined) place = null
    return place
  },

  // method to delete all places using placemarkid
  async getPlacemarkPlaces(placemarkId) {
    return places.filter((place) => place.placemarkid === placemarkId);
  },

  // method to delete an place using id
  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    if (index !== -1) places.splice(index, 1);
  },

  // method to delete all place
  async deleteAllPlaces() {
    places = [];
  },

  // method to update an place
  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.lat = updatedPlace.lat;
    place.lon = updatedPlace.lon;
    place.des = updatedPlace.des;
    place.img = updatedPlace.img;
  },
};
