import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacemarks, cities, beaches } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { EventEmitter } from "events";

EventEmitter.setMaxListeners(25);
suite("Placemark Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(testPlacemarks[i]);
    }
  });

  test("create a placemark", async () => {
    const placemark = await db.placemarkStore.addPlacemark(cities);
    assertSubset(cities, placemark);
    assert.isDefined(placemark._id);
  });

  test("delete all placemarks", async () => {
    let returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 3);
    await db.placemarkStore.deleteAllPlacemarks();
    returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("get a placemark - success", async () => {
    const placemark = await db.placemarkStore.addPlacemark(cities);
    const returnedPlacemark = await db.placemarkStore.getPlacemarkById(placemark.id);
    assertSubset(returnedPlacemark, placemark);
    const returnedPlacemark2 = await db.placemarkStore.getPlacemarkByName(placemark.name);
    assertSubset(returnedPlacemark2, placemark);
  });

  test("delete One Placemark - success", async () => {
    const id = testPlacemarks[0]._id;
    await db.placemarkStore.deletePlacemarkById(id);
    const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete One Placemark - fail", async () => {
    await db.placemarkStore.deletePlacemarkById("bad-id");
    const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, allPlacemarks.length);
  });

  test("get User Placemark - success", async () => {
    const placemark = await db.placemarkStore.addPlacemark(cities);
    const returnedPlacemark = await db.placemarkStore.getUserPlacemarks(placemark.userid);
    assertSubset(returnedPlacemark, placemark);
  });

  test("get user Placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getUserPlacemarks(""));
    assert.isNull(await db.placemarkStore.getUserPlacemarks());
  });

  test("Update Placemark - success", async () => {
    const newName = "updatedName";
    const newImg = "updatedImage";
    const placemark = await db.placemarkStore.addPlacemark(cities);
    placemark.name = newName;
    placemark.img = newImg;
    await db.placemarkStore.updatePlacemark(placemark);
    const updatedPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset(updatedPlacemark.name, newName);
    assertSubset(updatedPlacemark.img, newImg);
  });

  test("update Placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.updatePlacemark(""));
    assert.isNull(await db.placemarkStore.updatePlacemark());
  });

  test("get User Favourite Placemark - success", async () => {
    const placemark = await db.placemarkStore.addPlacemark(beaches);
    const returnedPlacemark = await db.placemarkStore.getUserFavouritePlacemark(beaches.userid);
    assertSubset(returnedPlacemark, placemark);
  });

  test("get User Favourite Placemar - bad params", async () => {
    assert.isNull(await db.placemarkStore.getUserFavouritePlacemark(""));
    assert.isNull(await db.placemarkStore.getUserFavouritePlacemark());
  });
});
