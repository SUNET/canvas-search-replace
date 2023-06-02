import { beforeEach, describe, expect, test } from "@jest/globals";
import ParentId from "../src/ParentId.js";
import ParentMapping from "../src/ParentMapping.js";
import WikiPage from "../src/WikiPage";

describe("ParentMapping", () => {
  const PARENT_ID = new ParentId("course", "group");
  const WIKI_PAGE_ID1 = "id1";
  const WIKI_PAGE_ID2 = "id2";
  const CANVAS_ID1 = "id1";
  const CANVAS_ID2 = "id2";

  test("Constructor: Should throw on no args", () => {
    expect(() => {
      const pm = new ParentMapping();
      pm.getPages()
    }).toThrow();
  });

  test("Constructor: Should throw on illegal arg", () => {
    expect(() => {
      const pm = new ParentMapping(1);
      pm.getPages()
    }).toThrow();
  });

  test("Constructor: Should work", () => {
    const mapping = new ParentMapping(PARENT_ID);
    expect(mapping.getParentId()).toBe(PARENT_ID);
  });

  describe("Pages", () => {
    let page1;
    let page2;
    let mapping;

    beforeEach(() => {
      mapping = new ParentMapping(PARENT_ID);
      page1 = new WikiPage(WIKI_PAGE_ID1, CANVAS_ID1);
      page2 = new WikiPage(WIKI_PAGE_ID2, CANVAS_ID2);
    });

    test("Should return empty array", () => {
      expect(mapping.getPages()).toEqual([]);
    });

    test("Should return array with one WikiPage", () => {
      mapping.addPage(page1);
      const pages = mapping.getPages();

      expect(mapping.getPages().length).toBe(1);
      expect(pages[0].getId()).toBe(WIKI_PAGE_ID1);
      expect(pages[0].getCanvasId()).toBe(CANVAS_ID1);
    });

    test("Should return array with two WikiPages", () => {
      mapping.addPage(page1);
      mapping.addPage(page2);
      const pages = mapping.getPages();

      expect(mapping.getPages().length).toBe(2);
      expect(pages[1].getId()).toBe(WIKI_PAGE_ID2);
      expect(pages[1].getCanvasId()).toBe(CANVAS_ID2);
    });
  });
});
