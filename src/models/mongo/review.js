// Code Developed By Renato
// email:20099697@mail.wit.ie
// mongo schema for review

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
  name: String,
  rating: Number,
  fullReview: String,
  postAt: Date,
  placeid: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

export const Review = Mongoose.model("Review", reviewSchema);