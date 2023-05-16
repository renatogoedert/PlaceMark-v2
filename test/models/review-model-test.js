import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testReviews, testPlaces, cities, beaches, city, berlin, homerReview } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Review Model tests", () => {

  let beachesList = null;
  let berlinList = null;
  
  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.placeStore.deleteAllPlaces();
    await db.reviewStore.deleteAllReviews();
    beachesList = await db.placemarkStore.addPlacemark(beaches);
    berlinList = await db.placeStore.addPlace(beachesList._id, berlin);
    for (let i = 0; i < testReviews.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testReviews[i] = await db.reviewStore.addReview(berlinList._id, testReviews[i]);
    }
  });

  test("create single review", async () => {
    // eslint-disable-next-line no-shadow
    const citiesList = await db.placemarkStore.addPlacemark(cities);
    const cityList = await db.placeStore.addPlace(citiesList._id, city);
    const review = await db.reviewStore.addReview(cityList._id, homerReview)
    assert.isNotNull(review._id);
    assertSubset (homerReview, review);
  });

  test("get multiple reviews", async () => {
    const reviews = await db.reviewStore.getReviewsByPlaceId(berlinList._id);
    assert.equal(reviews.length, testReviews.length)
  });

  test("delete all reviews", async () => {
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(testPlaces.length, reviews.length);
    await db.reviewStore.deleteAllReviews();
    const newReviews = await db.reviewStore.getAllReviews();
    assert.equal(0, newReviews.length);
  });

  test("get a Review - success", async () => {
    const citiesList = await db.placemarkStore.addPlacemark(cities);
    const cityList = await db.placeStore.addPlace(citiesList._id, city);
    const review = await db.reviewStore.addReview(cityList._id, homerReview)
    const newReview = await db.reviewStore.getReviewById(review._id);
    assertSubset (cities, newReview);
  });

  test("delete One Review - success", async () => {
    const id = testReviews[0]._id;
    await db.reviewStore.deleteReview(id);
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(reviews.length, testPlaces.length - 1);
    const deletedReview = await db.reviewStore.getReviewById(id);
    assert.isNull(deletedReview);
  });

  test("get a Review - bad params", async () => {
    assert.isNull(await db.reviewStore.getReviewById(""));
    assert.isNull(await db.reviewStore.getReviewById());
  });

  test("delete one Review - fail", async () => {
    await db.reviewStore.deleteReview("bad-id");
    const reviews = await db.reviewStore.getAllReviews();
    assert.equal(reviews.length, testReviews.length);
  });
  
});