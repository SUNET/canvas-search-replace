import { describe, expect, test } from "@jest/globals";
import Substitution from "../src/Substitution";

describe("Substitution", () => {
  test("Constructor: No args should throw", () => {
    expect(() => {
      const s = new Substitution();
      s.getTo()
    }).toThrow();
  });

  test("Constructor: Illegal args should throw", () => {
    expect(() => {
      const s =  new Substitution(1, 1);
      s.getTo()
    }).toThrow();
    expect(() => {
      const s = new Substitution("from", 1);
      s.getTo()
    }).toThrow();
  });
  test("Constructor: Should work", () => {
    expect(() => {
      const s =  new Substitution("from", "to");
      s.getTo()
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
