// Code Developed By Renato
// email:20099697@mail.wit.ie

import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { ReviewSpec, DiscussionSpec } from "../models/joi-schemas.js";
import clipboard from "clipboardy";
import url from "url";

// controller to render index view
export const placeController = {
  index: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const viewData = {
        title: "Place",
        place: place,
      };
      return h.view("place-view", viewData);
    },
  },

  // method to add one review with validation
  addReview: {
    validate: {
      payload: ReviewSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view(`about-view`, { title: "Add review error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      const newReview = {
        name: request.payload.name,
        rating: Number(request.payload.rating),
        fullReview: request.payload.fullReview,
        postAt: new Date(),
      };
      await db.reviewStore.addReview(place._id, newReview);
      const nativePlacemark = await db.placemarkStore.getPlacemarkById(place.placemarkid);
      const notice = {
        userid: nativePlacemark.userid,
        text: "Your Place: " + place.name + " has a new Review" ,
      };
      await db.noticeStore.addNotice(notice);
      return h.redirect(`/place/${place._id}`);
    },
  },

  // method to add one discussion with validation
  addDiscussion: {
    validate: {
      payload: DiscussionSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view(`about-view`, { title: "Add discussion error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const place = await db.placeStore.getPlaceById(request.params.id);
      const newDiscussion = {
        name: loggedInUser.firstName,
        text: request.payload.text,
      };
      await db.discussionStore.addDiscussion(place._id, newDiscussion);
      const nativePlacemark = await db.placemarkStore.getPlacemarkById(place.placemarkid);
      const notice = {
        userid: nativePlacemark.userid,
        text: loggedInUser.firstName + " posted on " + place.name,
      };
      await db.noticeStore.addNotice(notice);
      return h.redirect(`/place/${place._id}`);
    },
  },
 
  // method to upload a image in cloudinary
  uploadImage: {
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          place.img = url;
          await db.placeStore.updatePlace(place);
        }
        return h.redirect(`/dashboard`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/dashboard`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  // method to add one place 
  addToFavourites: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const place = await db.placeStore.getPlaceById(request.params.id);
      const newPlace = {
        name: place.name,
        lat: Number(place.lat),
        lon: Number(place.lon),
        des: place.des,
        img: place.img,
        isPublic: false,
      };
      const placemark = await db.placemarkStore.getUserFavouritePlacemark(loggedInUser._id);
      await db.placeStore.addPlace(placemark._id, newPlace);
      const nativePlacemark = await db.placemarkStore.getPlacemarkById(place.placemarkid);
      const notice = {
        userid: nativePlacemark.userid,
        text: "Your Place: " + place.name + " has been added to favourites" ,
      };
      await db.noticeStore.addNotice(notice);
      return h.redirect(`/dashboard`);
    },
  },

  shareLink: {
    handler: async function (request, h) {
      const host = request.headers.host;
      const link = `http://${host}${request.raw.req.url}`;
      const parts = link.split('/').filter(part => part !== 'sharelink');
      const modifiedLink = parts.join('/');
      await clipboard.write(modifiedLink);
      return h.redirect(`/place/${request.params.id}`);
    },
  },
};