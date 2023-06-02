import WikiPage from "../src/WikiPage.js";
import { expect } from "@jest/globals";

describe("WikiPage", () => {
  test("Should throw on missing args", () => {
    expect(() => {
      const wp = new WikiPage();
      wp.getId()
    }).toThrow();
  });

  test("Should throw on invalid arg types", () => {
    expect(() => {
      const wp = new WikiPage(1, 2);
      wp.getId()
    }).toThrow();
    expect(() => {
      const wp = new WikiPage("a", 2);
      wp.getId()
    }).toThrow();
  });

  test("Should throw empty strings as args", () => {
    expect(() => {
      const wp = new WikiPage("", "");
      wp.getId()
    }).toThrow();
  });

  test("Constructor should work", () => {
    const w = new WikiPage("123", "456");
    expect(w.getId()).toBe("123");
    expect(w.getCanvasId()).toBe("456");
  });
});
