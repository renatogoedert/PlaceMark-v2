// Code Developed By Renato
// email:20099697@mail.wit.ie

import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";
import { noticeMongoStore } from "./mongo/notice-mongo-store.js";

import { userFireStore } from "./firebase/user-fire-store.js";
import { placemarkFireStore } from "./firebase/placemark-fire-store.js";
import { placeFireStore } from "./firebase/place-fire-store.js";

// method to export the databases soters
export const db = {
  userStore: null,
  placemarkStore: null,
  placeStore: null,

  // statment to choose between the diferent kidn of models for db
  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placemarkStore = placemarkJsonStore;
        this.placeStore = placeJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.placeStore = placeMongoStore;
        this.reviewStore = reviewMongoStore;
        this.noticeStore = noticeMongoStore;
        connectMongo();
        break;
        case "firebase":
        this.userStore = userFireStore;
        this.placemarkStore = placemarkFireStore;
        this.placeStore = placeFireStore;
        break;
      default:
        this.userStore = userMemStore;
        this.placemarkStore = placemarkMemStore;
        this.placeStore = placeMemStore;
    }
  },
};
