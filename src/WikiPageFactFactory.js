import { isDataImporter } from "./Validator.js";
import WikiPageFact from "./WikiPageFact.js";

export default class WikiPageFactFactory {
  #dataImporter;

  constructor(dataImporter) {
    if (!isDataImporter(dataImporter)) {
      throw `${this.constructor.name}: arguments must instance of DataImporter`;
    }
    this.#dataImporter = dataImporter;
  }

  async createWikiPageFacts() {
    const linesOfData = await this.#dataImporter.getData();
    return this.#generateWikiPageFacts(linesOfData);
  }

  #generateWikiPageFacts(linesOfData) {
    const wikiPageFacts = [];
    for (const lineOfData of linesOfData) {
      const newWikiPageFact = this.#createWikiPageFact(lineOfData);
      if (newWikiPageFact) {
        wikiPageFacts.push(newWikiPageFact);
      }
    }
    return wikiPageFacts;
  }

  #createWikiPageFact(lineOfData) {
    const row = this.#createRow(lineOfData);
    const { wikiPageId, wikiId, parentCourseId, parentGroupId } =
      this.#extractIds(row);
    if (!wikiPageId || !wikiId) {
      return;
    }
    const newWikiPageFact = new WikiPageFact(wikiPageId, wikiId);
    if (parentCourseId !== "\\N") {
      newWikiPageFact.setParentCourseId(parentCourseId);
    }
    if (parentGroupId !== "\\N") {
      newWikiPageFact.setParentGroupId(parentGroupId);
    }
    return newWikiPageFact;
  }

  #extractIds(row) {
    const wikiPageId = row[0];
    const wikiId = row[1];
    const parentCourseId = row[2];
    const parentGroupId = row[3];
    return { wikiPageId, wikiId, parentCourseId, parentGroupId };
  }

  #createRow(line) {
    return line.split("\t");
  }
}
