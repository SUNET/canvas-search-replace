import WikiPage from "../src/WikiPage.js";
import { expect, jest } from "@jest/globals";

describe("WikiPage", () => {
  test("Should throw on missing args", () => {
    expect(() => {
      new WikiPage();
    }).toThrow();
  });

  test("Should throw on invalid arg types", () => {
    expect(() => {
      new WikiPage(1, 2, 3);
    }).toThrow();
    expect(() => {
      new WikiPage("a", 2, 3);
    }).toThrow();
    expect(() => {
      new WikiPage("1", "2", 3);
    }).toThrow();
  });

  test("Should throw empty strings as args", () => {
    expect(() => {
      new WikiPage("", "", "");
    }).toThrow();
  });

  test("Constructor should work", () => {
    const w = new WikiPage("123", "456", "body");
    expect(w.getId()).toBe("123");
    expect(w.getCanvasId()).toBe("456");
    expect(w.getBody()).toBe("body");
  });
});
