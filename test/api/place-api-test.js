import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, cities, testPlacemarks, testPlaces, berlin } from "../fixtures.js";

suite("Track API tests", () => {
  let user = null;
  let beaches = null;

  setup(async () => {
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllPlaces();
    user = await placemarkService.createUser(maggie);
    cities.userid = user._id;
    beaches = await placemarkService.createPlacemark(cities);
  });

  teardown(async () => {});

  test("create Place", async () => {
    const returnedPlace = await placemarkService.createPlace(beaches._id, berlin);
    assertSubset(berlin, returnedPlace);
  });

  test("create Multiple Places", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlace(beaches._id, testPlaces[i]);
    }
    const returnedPlaces = await placemarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await placemarkService.getPlace(returnedPlaces[i]._id);
      assertSubset(place, returnedPlaces[i]);
    }
  });

  test("Delete PlaceApi", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlace(beaches._id, testPlaces[i]);
    }
    let returnedPlaces = await placemarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await placemarkService.deletePlace(returnedPlaces[i]._id);
    }
    returnedPlaces = await placemarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, 0);
  });

  test("denormalised Placemark", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlace(beaches._id, testPlaces[i]);
    }
    const returnedPlacemark = await placemarkService.getPlacemarkt(beaches._id);
    assert.equal(returnedPlacemark.places.length, testPlaces.length);
    for (let i = 0; i < testPlaces.length; i += 1) {
      assertSubset(testPlaces[i], returnedPlacemarkt.places[i]);
    }
  });
});
