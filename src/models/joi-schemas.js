// Code Developed By Renato
// email:20099697@mail.wit.ie
// joi eschemas for validations

import Joi from "joi";

// spec for id
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// spec for users credentials
export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

// spec for users
export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

// adding Id and V for swagger
export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// spec for places
export const PlaceSpec = Joi.object()
.keys({
  name: Joi.string().required().example("Dublin"),
  lat: Joi.number().allow("").required().example(53.34),
  lon: Joi.number().allow("").required().example(-6.26),
  des: Joi.string().optional().example("Dublin, capital of the Republic of Ireland"),
  isPublic: Joi.string().allow("").example(true),
  placemarkid: IdSpec,
})
.label("Place");

// adding Id and V for swagger
export const PlaceSpecPlus = PlaceSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacePlus");

export const PlaceArraySpec = Joi.array().items(PlaceSpecPlus).label("PlaceArray");

// spec for placemarks
export const PlacemarkSpec = Joi.object()
.keys({
  name: Joi.string().required().example("cities"),
  userid: IdSpec,
  places: PlaceArraySpec,
})
.label("Placemark");

// adding Id and V for swagger
export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

// schema for jwt autentification
export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");