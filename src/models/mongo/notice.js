// Code Developed By Renato
// email:20099697@mail.wit.ie
// mongo schema for placemark

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const noticeSchema = new Schema({
  name: String,
  text: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Notice = Mongoose.model("Notice", noticeSchema);