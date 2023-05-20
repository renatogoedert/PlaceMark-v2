import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testDiscussions, testPlaces, cities, beaches, city, berlin, homerDiscussion } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { EventEmitter } from "events";

EventEmitter.setMaxListeners(50);
suite("Discussion Model tests", () => {

  let beachesList = null;
  let berlinList = null;
  
  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.placeStore.deleteAllPlaces();
    await db.discussionStore.deleteAllDiscussions();
    beachesList = await db.placemarkStore.addPlacemark(beaches);
    berlinList = await db.placeStore.addPlace(beachesList._id, berlin);
    for (let i = 0; i < testDiscussions.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testDiscussions[i] = await db.discussionStore.addDiscussion(berlinList._id, testDiscussions[i]);
    }
  });

  test("create single discussion", async () => {
    // eslint-disable-next-line no-shadow
    const citiesList = await db.placemarkStore.addPlacemark(cities);
    const cityList = await db.placeStore.addPlace(citiesList._id, city);
    const discussion = await db.discussionStore.addDiscussion(cityList._id, homerDiscussion)
    assert.isNotNull(discussion._id);
    assertSubset (homerDiscussion, discussion);
  });

  test("get multiple discussions", async () => {
    const discussions = await db.discussionStore.getDiscussionsByPlaceId(berlinList._id);
    assert.equal(discussions.length, testDiscussions.length)
  });

  test("delete all discussions", async () => {
    const discussions = await db.discussionStore.getAllDiscussions();
    assert.equal(testPlaces.length, discussions.length);
    await db.discussionStore.deleteAllDiscussions();
    const newDiscussions = await db.discussionStore.getAllDiscussions();
    assert.equal(0, newDiscussions.length);
  });

  test("get a Discussion - success", async () => {
    const citiesList = await db.placemarkStore.addPlacemark(cities);
    const cityList = await db.placeStore.addPlace(citiesList._id, city);
    const discussion = await db.discussionStore.addDiscussion(cityList._id, homerDiscussion)
    const newDiscussion = await db.discussionStore.getDiscussionById(discussion._id);
    assertSubset (cities, newDiscussion);
  });

  test("delete One Discussion - success", async () => {
    const id = testDiscussions[0]._id;
    await db.discussionStore.deleteDiscussion(id);
    const discussions = await db.discussionStore.getAllDiscussions();
    assert.equal(discussions.length, testPlaces.length - 1);
    const deletedDiscussion = await db.discussionStore.getDiscussionById(id);
    assert.isNull(deletedDiscussion);
  });

  test("get a Discussion - bad params", async () => {
    assert.isNull(await db.discussionStore.getDiscussionById(""));
    assert.isNull(await db.discussionStore.getDiscussionById());
  });

  test("delete one Discussion - fail", async () => {
    await db.discussionStore.deleteDiscussion("bad-id");
    const discussions = await db.discussionStore.getAllDiscussions();
    assert.equal(discussions.length, testDiscussions.length);
  });
  
});