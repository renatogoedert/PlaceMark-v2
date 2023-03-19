// Code Developed By Renato
// email:20099697@mail.wit.ie

import { db } from "../models/db.js";

// controller to render index view
export const adminController = {
  index: {
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const viewData = {
        title: "Admin Users Dashboard",
        users: users,
      };
      return h.view("admin-users-view", viewData);
    },
  },

  // delete a user method
  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/adminusers");
    },
  },
}