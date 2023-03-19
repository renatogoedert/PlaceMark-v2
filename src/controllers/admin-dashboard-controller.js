// Code Developed By Renato
// email:20099697@mail.wit.ie

import { db } from "../models/db.js";

// controller to render index view
export const adminDashboardController = {
    index: {
        handler: async function (request, h) {
          const users = await db.userStore.getAllUsers();
          const viewData = {
            title: "Admin Dashboard",
            users: users,
          };
          return h.view("admin-view", viewData);
        },
    }
}