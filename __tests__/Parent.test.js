import { expect } from "@jest/globals";
import Parent from "../src/Parent";
import WikiPage from "../src/WikiPage";

describe("Course", () => {
  const ID = "id";
  const CANVAS_ID = "canvasId";

  test("Should throw on missing args", () => {
    expect(() => {
      new Parent();
    }).toThrow();
  });

  test("Should throw on invalid arg types", () => {
    expect(() => {
      new Parent(1, 2);
    }).toThrow();
    expect(() => {
      new Parent(ID, 2);
    }).toThrow();
  });

  test("Should throw empty strings as args", () => {
    expect(() => {
      new Parent("", "");
    }).toThrow();
  });

  test("Constructor should work", () => {
    const parent = new Parent(ID, CANVAS_ID);
    expect(parent.getId()).toBe(ID);
    expect(parent.getCanvasId()).toBe(CANVAS_ID);
    expect(parent.getPages()).toEqual([]);
  });

  test("Add pages should work", () => {
    const parent = new Parent(ID, CANVAS_ID);
    const wikiPage1 = new WikiPage("id1", "canvasId1");
    const wikiPage2 = new WikiPage("id2", "canvasId2");
    expect(parent.getPages().length).toEqual(0);

    parent.addPage(wikiPage1);
    parent.addPage(wikiPage2);
    const [p1, p2] = parent.getPages();

    expect(parent.getPages().length).toEqual(2);
    expect(p1.getId()).toBe("id1");
    expect(p2.getId()).toBe("id2");
  });
});
