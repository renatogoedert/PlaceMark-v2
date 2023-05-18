// Code Developed By Renato
// email:20099697@mail.wit.ie
// mongo schema for discussion

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const discussionSchema = new Schema({
  name: String,
  text: String,
  placeid: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

export const Discussion = Mongoose.model("Discussion", discussionSchema);