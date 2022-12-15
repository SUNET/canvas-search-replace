import * as fs from "fs";
import CanvasPage from "./CanvasPage.js";

export default class CanvasPageImport {
  #pages = [];
  #substitutions = [];

  constructor(substitutions) {
    substitutions.forEach((s) => {
      this.#substitutions.push(s);
    });
  }

  getPages() {
    return this.#pages;
  }

  async importPagesFromFile(pathToFile) {
    try {
      const data = await fs.promises.readFile(pathToFile, "utf8");
      const pages = this.#generatePages(data);
      const filteredPages = this.#filterPages(pages);
      console.log(filteredPages.length);
      console.log(
        "Got " + filteredPages.length + " hits from " + pages.length + " pages."
      );
      this.#pages = filteredPages;
    } catch (error) {
      console.error(error);
    }
  }

  #generatePages(pagesRawData) {
    const pages = [];
    for (const page of pagesRawData.split("\n")) {
      const pageComponents = page.split("\t");
      const newPage = new CanvasPage(
        pageComponents[0],
        pageComponents[1],
        pageComponents[3]
      );
      pages.push(newPage);
    }
    return pages;
  }

  #filterPages(pages) {
    const filteredPages = [];
    for (const pageToEvaluate of pages) {
      if (
        pageToEvaluate.body &&
        this.#bodyHasTargetContent(pageToEvaluate.body)
      ) {
        filteredPages.push(pageToEvaluate);
      }
    }
    return filteredPages;
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
}
