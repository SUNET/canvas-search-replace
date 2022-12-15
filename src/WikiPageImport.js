import * as fs from "fs";
import WikiPage from "./WikiPage.js";

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
      console.log(
        "Got " +
          filteredPages.length +
          " hits from " +
          pages.length +
          " valid pageRows."
      );
      this.#pages = filteredPages;
    } catch (error) {
      console.error(error);
    }
  }

  #generatePages(pagesRawData) {
    const pages = [];
    for (const page of pagesRawData.split("\n").slice(1)) {
      const pageRow = page.split("\t");
      const id = pageRow[0];
      const canvasId = pageRow[1];
      const body = pageRow[3];
      if (id && canvasId && body) {
        const newPage = new WikiPage(id, canvasId, body);
        pages.push(newPage);
      }
    }
    return pages;
  }

  #filterPages(pages) {
    const filteredPages = [];
    for (const pageToEvaluate of pages) {
      if (
        pageToEvaluate.getBody() &&
        this.#bodyHasTargetContent(pageToEvaluate.getBody())
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
