// Code Developed By Renato
// email:20099697@mail.wit.ie
// joi eschemas for validations

import Joi from "joi";

// spec for id
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// spec for users credentials
export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string()
      .email({ tlds: { allow: false } }) // Email format validation
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) // Additional regex validation
      .required()
      .example("homer@simpson.com")
      .messages({
        'string.pattern.base': 'Invalid email format',
      }),
    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/) // Password regex validation
      .required()
      .example("secret")
      .messages({
        'string.pattern.base': 'Password must contain at least one letter, one digit, and be at least 6 characters long',
      }),
  })
  .label("UserCredentials");

// spec for users
export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string()
    .regex(/^[A-Za-z'][A-Za-z0-9_' ]{2,29}$/)
    .example("Homer")
    .required()
    .messages({
      'string.pattern.base': 'First name must start with a letter or a single quote, and be 2 to 30 characters long, containing only letters, numbers, underscores, spaces, and single quotes',
    }),
  lastName: Joi.string()
    .regex(/^[A-Za-z'][A-Za-z0-9_' ]{2,29}$/)
    .example("Simpson")
    .required()
    .messages({
      'string.pattern.base': 'Last name must start with a letter or a single quote, and be 2 to 30 characters long, containing only letters, numbers, underscores, spaces, and single quotes',
    }),
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
  lat: Joi.number().min(-90).max(90).required().example(53.34),
  lon: Joi.number().min(-180).max(180).required().example(-6.26),
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
    name: Joi.string()
      .regex(/^[A-Za-z'][A-Za-z0-9_' ]{7,29}$/)
      .required()
      .example("cities")
      .messages({
        'string.pattern.base': 'Name must start with a letter and be 8 to 30 characters long, containing only letters, numbers, and underscores',
      }),
    isFavourite: Joi.boolean().allow("").example(false),
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

  // spec for reviews
export const ReviewSpec = Joi.object()
.keys({
  name: Joi.string().required().example("Homer"),
  rating: Joi.number().integer().min(1).max(5).required().example(4),
  fullReview: Joi.string().required().example("Great movie, made me enjoy cinemas again"),
})
.label("Review");

// adding Id and V for swagger
export const ReviewSpecPlus = ReviewSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");

  // spec for discussion
export const DiscussionSpec = Joi.object()
.keys({
  text: Joi.string().required().example("Great movie, made me enjoy cinemas again"),
})
.label("Discussion");

// adding Id and V for swagger
export const DiscussionSpecPlus = DiscussionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("DiscussionPlus");

export const DiscussionArraySpec = Joi.array().items(DiscussionSpecPlus).label("DiscussionArray");



// schema for jwt autentification
export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");