// Code Developed By Renato
// email:20099697@mail.wit.ie
import { fireStore } from "./connect.js";

// store for users in mongo db
export const userFireStore = {
  // method to find all users
  async getAllUsers() {
    const users = await fireStore.collection("user").get();
    return users.docs.map(doc => doc.data());
  },

  // method to find one user using id
  async getUserById(id) {
    if (id) {
      const userDoc = await fireStore.collection("user").doc(id).get();
      let userData = userDoc.data();
      if (userData === undefined) userData = null;
      return userData;
    }
    return null;
  },
     
  // method to add an user
  async addUser(user) {
    const newUserRef = await fireStore.collection("user").add(user);
    const newUserDocRef = fireStore.collection("user").doc(newUserRef.id);
    await newUserDocRef.set({ _id: newUserRef.id }, { merge: true });
    const newUserObj = await newUserRef.get();
    const newUser = newUserObj.data();
    return newUser;
  },

  // method to get an user using email
  async getUserByEmail(email) {
    const querySnapshot = await fireStore.collection("user").where("email", "==", email).get();
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    }
    return null;
  },

  // method to delete an user using id
  async deleteUserById(id) {
    try {
      await fireStore.collection("user").doc(id).delete();
    } catch (error) {
      console.log("Error deleting user:", error.message);
      throw error;
    }
  },

  // method to delete all users
  async deleteAll() {
    const batch = fireStore.batch();
    const query = await fireStore.collection("user").get();
    query.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }
};