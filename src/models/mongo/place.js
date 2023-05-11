// Code Developed By Renato
// email:20099697@mail.wit.ie
// mongo schema for place

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  name: String,
  lat: Number,
  lon: Number,
  des: String,
  img: String,
  isPublic: Boolean,
  placemarkid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
