import { beforeEach, describe, expect, test } from "@jest/globals";
import Substitution from "../src/Substitution";

describe("Substitution", () => {
  test("Constructor: No args should throw", () => {
    expect(() => {
      new Substitution();
    }).toThrow();
  });

  test("Constructor: Illegal args should throw", () => {
    expect(() => {
      new Substitution(1, 1);
    }).toThrow();
  });
  expect(() => {
    new Substitution("from", 1);
  }).toThrow();
  test("Constructor: Should work", () => {
    expect(() => {
      new Substitution("from", "to");
    }).not.toThrow();
  });

  describe("Replace", () => {
    const s = new Substitution("from", "to");

    test("a", () => {});
    const input = "a from a fromfrom afroma";
    const expected = "a to a toto atoa";

    const actual = s.updateText(input);

    expect(actual).toBe(expected);
  });
});
