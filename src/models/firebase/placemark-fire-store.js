// Code Developed By Renato
// email:20099697@mail.wit.ie
import { fireStore } from "./connect.js";
import { placeFireStore } from "./place-fire-store.js";

// store for placemarks in mongo db
export const placemarkFireStore = {
  // method to find all placemarks
  async getAllPlacemarks() {
    const placemarks = await fireStore.collection("placemark").get();
    return placemarks.docs.map(doc => doc.data());
  },

  // method to find one placemark using id
  async getPlacemarkById(id) {
    if (id) {
      const placemarkRef = await fireStore.collection("placemark").doc(id).get();
      let placemarkData = placemarkRef.data();
      if (placemarkData) {
        placemarkData.places = await placeFireStore.getPlacesByPlacemarkId(id);
      }
      if (placemarkData === undefined) placemarkData = null;
      return placemarkData;
    }
    return null;
  },

  // method to add an placemark
  async addPlacemark(placemark) {
    const newPlacemarkRef = await fireStore.collection("placemark").add(placemark);
    const newPlacemarkDocRef = fireStore.collection("placemark").doc(newPlacemarkRef.id);
    await newPlacemarkDocRef.set({ _id: newPlacemarkRef.id }, { merge: true });
    const newPlacemarkObj = await newPlacemarkRef.get();
    const newPlacemark = newPlacemarkObj.data();
    return newPlacemark;
  },

  // method to get an placemark using userid
  async getUserPlacemarks(id) {
    const placemarksRef = await fireStore.collection("placemark").where("userid", "==", id).get();
    const placemarks = placemarksRef.docs.map((doc) => doc.data());
    return placemarks;
  },

  // method to delete an placemark using id
  async deletePlacemarkById(id) {
    try {
      await fireStore.collection("placemark").doc(id).delete();
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all placemark
  async deleteAllPlacemarks() {
    const placemarksRef = await fireStore.collection("placemark").get();
    const batch = fireStore.batch();
    placemarksRef.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  },


  // method to update placemark
  async updatePlacemark(updatedPlacemark) {
    const placemarkRef = await fireStore.collection("placemark").doc(updatedPlacemark._id);
    await placemarkRef.update({
      name: updatedPlacemark.name,
      img: updatedPlacemark.img,
    });
  }
};
