//import { userMemStore } from "./mem/user-mem-store.js";
//import { placemarkMemStore } from "./mem/placemark-mem-store.js";
//import { placeMemStore } from "./mem/place-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  placeStore: null,

  init() {
    this.userStore = userJsonStore;
    this.placemarkStore = placemarkJsonStore;
    this.placeStore = placeJsonStore;
  },
};
