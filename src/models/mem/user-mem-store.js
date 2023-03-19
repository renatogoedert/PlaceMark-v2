// Code Developed By Renato
// email:20099697@mail.wit.ie

import { v4 } from "uuid";

let users = [];

// store for places in mongo db
export const userMemStore = {
  // method to find all users
  async getAllUsers() {
    return users;
  },

  // method to add an user
  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  // method to find one user using id
  async getUserById(id) {
    let u = users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  // method to get an user using email
  async getUserByEmail(email) {
    let u = users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },

  // method to delete an user using id
  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) users.splice(index, 1);
  },

  // method to delete all users
  async deleteAll() {
    users = [];
  },
};
