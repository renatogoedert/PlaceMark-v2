// Code Developed By Renato
// email:20099697@mail.wit.ie

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

// starting .evc
const result = dotenv.config();

// create jws token
export function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.cookie_password, options);
}

// decode the jws tolen
export function decodeToken(token) {
  const userInfo = {};
  try {
    const decoded = jwt.verify(token, process.env.cookie_password);
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
  } catch (e) {
    console.log(e.message);
  }
  return userInfo;
}

// validate the jws tolen
export async function validate(decoded, request) {
  const user = await db.userStore.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}

