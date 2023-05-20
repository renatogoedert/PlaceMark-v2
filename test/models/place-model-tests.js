import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacemarks, testPlaces, cities, beaches, berlin, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {

  let beachesList = null;

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.placeStore.deleteAllPlaces();
    beachesList = await db.placemarkStore.addPlacemark(beaches);
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await db.placeStore.addPlace(beachesList._id, testPlaces[i]);
    }
  });

  test("create single place", async () => {
    // eslint-disable-next-line no-shadow
    const citiesList = await db.placemarkStore.addPlacemark(cities);
    const place = await db.placeStore.addPlace(citiesList._id, berlin)
    assert.isNotNull(place._id);
    assertSubset (berlin, place);
  });

  test("get multiple places", async () => {
    const places = await db.placeStore.getPlacesByPlacemarkId(beachesList._id);
    assert.equal(places.length, testPlaces.length)
  });

  test("delete all places", async () => {
    const places = await db.placeStore.getAllPlaces();
    assert.equal(testPlaces.length, places.length);
    await db.placeStore.deleteAllPlaces();
    const newPlaces = await db.placeStore.getAllPlaces();
    assert.equal(0, newPlaces.length);
  });

  test("get a place - success", async () => {
    const beachesList = await db.placemarkStore.addPlacemark(beaches);
    const place = await db.placeStore.addPlace(beachesList._id, cities)
    const newPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset (cities, newPlace);
  });

  test("delete One Place - success", async () => {
    const id = testPlaces[0]._id;
    await db.placeStore.deletePlace(id);
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testPlacemarks.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(id);
    assert.isNull(deletedPlace);
  });

  test("get a place - bad params", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("delete one place - fail", async () => {
    await db.placeStore.deletePlace("bad-id");
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testPlacemarks.length);
  });

  test("Update Place - success", async () => {
    const newName = "updatedName";
    const newImg = "updatedImage";
    const citiesList = await db.placemarkStore.addPlacemark(cities);
    const place = await db.placeStore.addPlace(citiesList._id, berlin);
    place.name = newName;
    place.img = newImg;
    await db.placeStore.updatePlace(place);
    const updatedPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset(updatedPlace.name, newName);
    assertSubset(updatedPlace.img, newImg);
  });

  test("update Place - bad params", async () => {
    assert.isNull(await db.placeStore.updatePlace(""));
    assert.isNull(await db.placeStore.updatePlace());
  });

  test("get public places - success", async () => {
    const places= await db.placeStore.getPublicPlaces();
    assert.equal(places.length, 1);
  })


});
