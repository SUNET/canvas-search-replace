import { describe, test, jest } from "@jest/globals";
import DataImporter from "../src/DataImporter";
import Substitution from "../src/Substitution";
import WikiPageFactory from "../src/WikiPageFactory";

const mockFs = jest.fn();

describe("WikiPageFactory", () => {
  const s = new Substitution("from", "to");
  const d = new DataImporter(mockFs);

  test("t", () => {
    const f = new WikiPageFactory(d, [s]);
  });
});
