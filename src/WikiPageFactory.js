import { isDataImporter, isSubstitution } from "./Validator.js";
import WikiPage from "./WikiPage.js";

export default class WikiPageFactory {
  #dataImporter;
  #substitutions = [];

  constructor(dataImporter, substitutions) {
    substitutions.forEach((s) => {
      if (!isSubstitution(s)) {
        throw `${this.constructor.name}: argument must be instances of Substitution`;
      }
      this.#substitutions.push(s);
    });
    if (!isDataImporter(dataImporter)) {
      throw `${this.constructor.name}: argument must instance of DataImporter`;
    }
    this.#dataImporter = dataImporter;
  }

  async createWikiPages() {
    const linesOfData = await this.#dataImporter.getData();
    return this.#generateWikiPages(linesOfData);
  }

  #generateWikiPages(linesOfData) {
    const wikiPages = [];
    for (const lineOfData of linesOfData) {
      const newWikiPage = this.#createWikiPage(lineOfData);
      if (newWikiPage) {
        wikiPages.push(newWikiPage);
      }
    }
    return wikiPages;
  }

  #createWikiPage(lineOfData) {
    const pageRow = this.#createRow(lineOfData);
    const id = pageRow[0];
    const canvasId = pageRow[1];
    const body = pageRow[3];
    if (id && canvasId && this.#bodyHasTargetContent(body)) {
      return new WikiPage(id, canvasId, body);
    }
    return;
  }

  #bodyHasTargetContent(pageBody) {
    let match = false;
    this.#substitutions.forEach((subPair) => {
      const matchString = subPair.getFrom();
      if (pageBody.includes(matchString)) {
        match = true;
      }
    });
    return match;
  }

  #createRow(line) {
    return line.split("\t");
  }
}
