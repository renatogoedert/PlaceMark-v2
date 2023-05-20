import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testNotices, noticeA, noticeB } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { EventEmitter } from "events";

EventEmitter.setMaxListeners(25);
suite("Notice Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.noticeStore.deleteAllNotices();
    for (let i = 0; i < testNotices.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testNotices[i] = await db.noticeStore.addNotice(testNotices[i]);
    }
  });

  test("create a notice", async () => {
    const notice = await db.noticeStore.addNotice(noticeA);
    assertSubset(noticeA, notice);
    assert.isDefined(notice._id);
  });

  test("delete all Notices", async () => {
    let returnedNotices = await db.noticeStore.getAllNotices();
    assert.equal(returnedNotices.length, 3);
    await db.noticeStore.deleteAllNotices();
    returnedNotices = await db.noticeStore.getAllNotices();
    assert.equal(returnedNotices.length, 0);
  });

  test("get a Notice - success", async () => {
    const notice = await db.noticeStore.addNotice(noticeA);
    const returnedNotice = await db.noticeStore.getNoticeById(notice.id);
    assertSubset(returnedNotice, notice);
  });

  test("delete One Notice - success", async () => {
    const id = testNotices[0]._id;
    await db.noticeStore.deleteNoticeById(id);
    const returnedNotices = await db.noticeStore.getAllNotices();
    assert.equal(returnedNotices.length, testNotices.length - 1);
    const deletedNotice = await db.noticeStore.getNoticeById(id);
    assert.isNull(deletedNotice);
  });

  test("get a Notice - bad params", async () => {
    assert.isNull(await db.noticeStore.getNoticeById(""));
    assert.isNull(await db.noticeStore.getNoticeById());
  });

  test("delete One Notice - fail", async () => {
    await db.noticeStore.deleteNoticeById("bad-id");
    const allNotices = await db.noticeStore.getAllNotices();
    assert.equal(testNotices.length, allNotices.length);
  });

  test("get User Notice - success", async () => {
    const notice = await db.noticeStore.addNotice(noticeA);
    const returnedNotice = await db.noticeStore.getUserNotices(notice.userid);
    assertSubset(returnedNotice, notice);
  });

  test("get user Notice - bad params", async () => {
    assert.isNull(await db.noticeStore.getUserNotices(""));
    assert.isNull(await db.noticeStore.getUserNotices());
  });
});