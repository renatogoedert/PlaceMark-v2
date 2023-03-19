// Code Developed By Renato
// email:20099697@mail.wit.ie
import { fireStore } from "./connect.js";

// store for places in mongo db
export const placeFireStore = {
    // method to find all places
    async getAllPlaces() {
      const places = await fireStore.collection("place").get();
      return places.docs.map(doc => doc.data());
    },
  
    // method to find one place using placemarkid
    async getPlacesByPlacemarkId(id) {
      const placesSnapshot = await fireStore.collection("place").where("placemarkid", "==", id).get();
      const places = placesSnapshot.docs.map((doc) => doc.data());
      return places;
    },
  
    // method to add an place
    async addPlace(placemarkId, place) {
      const newPlaceRef = await fireStore.collection("place").add(place);
      const newPlaceDocRef = fireStore.collection("place").doc(newPlaceRef.id);
      await newPlaceDocRef.set({ _id: newPlaceRef.id, placemarkid: placemarkId }, { merge: true });
      const newPlaceObj = await newPlaceRef.get();
      const newPlace = newPlaceObj.data();
      return newPlace;
    },
  
    // method to get an place using id
    async getPlaceById(id) {
      if (id) {
        const placeRef = await fireStore.collection("place").doc(id).get();
        let placeData = placeRef.data();
        if (placeData === undefined) placeData = null;
        return placeData;
      }
      return null;
    },
  
    // method to delete an place using id
    async deletePlace(id) {
      try {
        await fireStore.collection("place").doc(id).delete();
      } catch (error) {
        console.log("bad id");
      }
    },
  
    // method to delete all place
    async deleteAllPlaces() {
      const placeRef = await fireStore.collection("place").get();
      const batch = fireStore.batch();
      placeRef.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
    },
  
    // method to update an place
    async updatePlace(place, updatedPlace) {
      const placeRef = fireStore.collection("place").doc(place._id);
      await placeRef.update({
        name: updatedPlace.name,
        lat: updatedPlace.lat,
        lon: updatedPlace.lon,
        des: updatedPlace.des,
      });
    },
  };
  