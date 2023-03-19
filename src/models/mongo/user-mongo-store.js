// Code Developed By Renato
// email:20099697@mail.wit.ie

import { User } from "./user.js";

// store for places in mongo db
export const userMongoStore = {
  // method to find all users
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  // method to find one user using id
  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  // method to add an user
  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  // method to get an user using email
  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  // method to delete an user using id
  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all users
  async deleteAll() {
    await User.deleteMany({});
  }
};
