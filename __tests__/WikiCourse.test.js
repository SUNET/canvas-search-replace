import { expect } from "@jest/globals";
import WikiCourse from "../src/WikiCourse";
import WikiPage from "../src/WikiPage";

describe("WikiCourse", () => {
  const ID = "id";
  const CANVAS_ID = "canvasId";

  test("Should throw on missing args", () => {
    expect(() => {
      new WikiCourse();
    }).toThrow();
  });

  test("Should throw on invalid arg types", () => {
    expect(() => {
      new WikiCourse(1, 2);
    }).toThrow();
    expect(() => {
      new WikiCourse(ID, 2);
    }).toThrow();
  });

  test("Should throw empty strings as args", () => {
    expect(() => {
      new WikiCourse("", "");
    }).toThrow();
  });

  test("Constructor should work", () => {
    const w = new WikiCourse(ID, CANVAS_ID);
    expect(w.getId()).toBe(ID);
    expect(w.getCanvasId()).toBe(CANVAS_ID);
    expect(w.getPages()).toEqual([]);
  });

  test("Add pages should work", () => {
    const w = new WikiCourse(ID, CANVAS_ID);
    const wikiPage1 = new WikiPage("id1", "canvasId1", "body");
    const wikiPage2 = new WikiPage("id2", "canvasId2", "body");
    expect(w.getPages().length).toEqual(0);

    w.addPage(wikiPage1);
    w.addPage(wikiPage2);
    const [p1, p2] = w.getPages();

    expect(w.getPages().length).toEqual(2);
    expect(p1.getId()).toBe("id1");
    expect(p2.getId()).toBe("id2");
  });
});
