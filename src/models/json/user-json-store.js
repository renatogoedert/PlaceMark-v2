// Code Developed By Renato
// email:20099697@mail.wit.ie

import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// starting json database
const db = new Low(new JSONFile("./src/models/json/users.json"));
db.data = { users: [] };

// store for users in mongo db
export const userJsonStore = {
  // method to find all users
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  // method to add an user
  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  // method to find one user using id
  async getUserById(id) {
    await db.read();
    let u = db.data.users.find((user) => user._id === id);
    if (u === undefined) u = null;
    return u;
  },

  // method to get an user using email
  async getUserByEmail(email) {
    await db.read();
    let u = db.data.users.find((user) => user.email === email);
    if (u === undefined) u = null;
    return u;
  },

  // method to delete an user using id
  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },

  // method to delete all users
  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
