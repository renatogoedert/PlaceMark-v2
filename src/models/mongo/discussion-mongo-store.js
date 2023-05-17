// Code Developed By Renato
// email:20099697@mail.wit.ie

import { Discussion } from "./discussion.js";

// store for discussions in mongo db
export const discussionMongoStore = {
  // method to find all discussions 
  async getAllDiscussions() {
    const discussions = await Discussion.find().lean();
    return discussions;
  },

  // method to find one Discussion using placeid
  async getDiscussionsByPlaceId(id) {
    const discussions = await Discussion.find({ placeid: id }).lean();
    return discussions;
  },

  // method to add an place
  async addDiscussion(placeId, discussion) {
    discussion.placeid = placeId;
    const newDiscussion = new Discussion(discussion);
    const discussionObj = await newDiscussion.save();
    return this.getDiscussionById(discussionObj._id);
  },

  // method to get an Discussion using id
  async getDiscussionById(id) {
    if (id) {
      const discussion = await Discussion.findOne({ _id: id }).lean();
      return discussion;
    }
    return null;
  },

  // method to delete an Discussion using id
  async deleteDiscussion(id) {
    try {
      await Discussion.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all Discussion
  async deleteAllDiscussions() {
    await Discussion.deleteMany({});
  },
};