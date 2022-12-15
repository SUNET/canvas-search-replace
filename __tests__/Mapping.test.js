import { expect } from "@jest/globals";
import Mapping from "../src/Mapping";

describe("Mapping", () => {
  test("Should throw on missing args", () => {
    expect(() => {
      new Mapping();
    }).toThrow();
  });

  test("Should throw on invalid arg types", () => {
    expect(() => {
      new Mapping(1, 2);
    }).toThrow();
    expect(() => {
      new Mapping("a", 2);
    }).toThrow();
  });

  test("Should throw empty strings as args", () => {
    expect(() => {
      new Mapping("", "");
    }).toThrow();
  });

  test("Constructor should work", () => {
    const w = new Mapping("123", "456", "body");
    expect(w.getChildId()).toBe("123");
    expect(w.getParentId()).toBe("456");
  });
});
