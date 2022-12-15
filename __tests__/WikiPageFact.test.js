import { beforeEach, describe, expect, test } from "@jest/globals";
import WikiPageFact from "../src/WikiPageFact";

describe("WikiPageFact", () => {
  test("Should throw on missing args", () => {
    expect(() => {
      new WikiPageFact();
    }).toThrow();
  });

  test("Should throw on invalid arg types", () => {
    expect(() => {
      new WikiPageFact(1, 2);
    }).toThrow();
    expect(() => {
      new WikiPageFact("a", 2);
    }).toThrow();
  });

  test("Should throw empty strings as args", () => {
    expect(() => {
      new WikiPageFact("", "");
    }).toThrow();
  });

  test("Constructor should work", () => {
    const wpf = new WikiPageFact("wpid", "wid");
    expect(wpf.getWikiPageId()).toBe("wpid");
    expect(wpf.getWikiId()).toBe("wid");
  });

  describe("Groups and courses", () => {
    let wpf;

    beforeEach(() => {
      wpf = new WikiPageFact("123", "456");
    });

    test("Empty parentCourseId", () => {
      expect(wpf.getParentCourseId()).toBe(undefined);
      expect(wpf.hasParentCourse()).toBeFalsy();

      wpf.setParentCourseId("pcid");

      expect(wpf.getParentCourseId()).toBe("pcid");
      expect(wpf.hasParentCourse()).toBeTruthy();
    });

    test("Empty parentGroupId", () => {
      expect(wpf.getParentGroupId()).toBe(undefined);
      expect(wpf.hasParentGroup()).toBeFalsy();

      wpf.setParentGroupId("pgid");

      expect(wpf.getParentGroupId()).toBe("pgid");
      expect(wpf.hasParentGroup()).toBeTruthy();
    });
  });
});
