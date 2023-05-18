// Code Developed By Renato
// email:20099697@mail.wit.ie

import { Notice } from "./notice.js";

// store for notice in mongo db
export const noticeMongoStore = {
  // method to find all notice
  async getAllNotices() {
    const notices = await Notice.find().sort({ _id: -1 }).lean();
    return notices;
  },

    // method to find one notice using id
    async getNoticeById(id) {
      if (id) {
        const notice = await Notice.findOne({ _id: id }).lean();
        return notice;
      }
      return null;
    },

  // method to add an notice
  async addNotice(notice) {
    const newNotice = new Notice(notice);
    const noticeObj = await newNotice.save();
    return this.getNoticeById(noticeObj._id);
  },

  // method to get an notice using userid
  async getUserNotices(id) {
    const notice = await Notice.find({ userid: id }).sort({ _id: -1 }).lean();
    return notice;
  },

  // method to delete an notice using id
  async deleteNoticeById(id) {
    try {
      await Notice.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all notice
  async deleteAllNotices() {
    await Notice.deleteMany({});
  },

  // method to update an notice
  async updateNotice(updatedNotice) {
    const notice = await Notice.findOne({ _id: updatedNotice._id });
    notice.name = updatedNotice.name;
    notice.img = updatedNotice.img;
    await notice.save();
  },
};
