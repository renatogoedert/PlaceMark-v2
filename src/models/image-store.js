// Code Developed By Renato
// email:20099697@mail.wit.ie

import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

// starting .evc
dotenv.config();

// getting the credentials from .env
const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
};
cloudinary.config(credentials);

// creating module to export image store 
export const imageStore = {

  // method to get all images
  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  // method to upload images
  uploadImage: async function(imagefile) {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  // method to delete images
  deleteImage: async function(img) {
    await cloudinary.v2.uploader.destroy(img, {});
  }
};
