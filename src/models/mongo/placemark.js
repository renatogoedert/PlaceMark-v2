// Code Developed By Renato
// email:20099697@mail.wit.ie
// mongo schema for placemark

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  img: String,
  isFavourite: Boolean,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
