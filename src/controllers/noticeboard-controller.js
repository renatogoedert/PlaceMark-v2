// Code Developed By Renato
// email:20099697@mail.wit.ie

// controller to render notice places view
import { db } from "../models/db.js";

export const noticeboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const notices= await db.noticeStore.getUserNotices(loggedInUser._id);
      const viewData = {
        title: "Noticeboard",
        notices: notices,
      };
      return h.view("noticeboard-view", viewData);
    },
  },
}