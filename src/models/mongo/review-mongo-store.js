// Code Developed By Renato
// email:20099697@mail.wit.ie

import { Review } from "./review.js";

// store for reviews in mongo db
export const reviewMongoStore = {
  // method to find all reviews 
  async getAllReviews() {
    const reviews = await Review.find().lean();
    return reviews;
  },

  // method to find one review using placeid
  async getReviewsByPlaceId(id) {
    const reviews = await Review.find({ placeid: id }).lean();
    return reviews;
  },

  // method to add an place
  async addReview(placeId, review) {
    review.placeid = placeId;
    const newReview = new Review(review);
    const reviewObj = await newReview.save();
    return this.getReviewById(reviewObj._id);
  },

  // method to get an review using id
  async getReviewById(id) {
    if (id) {
      const review = await Review.findOne({ _id: id }).lean();
      return review;
    }
    return null;
  },

  // method to delete an review using id
  async deleteReview(id) {
    try {
      await Review.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // method to delete all review
  async deleteAllReviews() {
    await Review.deleteMany({});
  },
};