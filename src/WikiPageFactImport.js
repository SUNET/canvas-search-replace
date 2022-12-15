import * as fs from "fs";
import WikiCourse from "./WikiCourse.js";

export default class WikiPageFactImport {
  #importResult = [];

  async import(pathToFile) {
    try {
      const data = await fs.promises.readFile(pathToFile, "utf8");
      const wikiPageLines = this.#createArrayOfLines(data);
      const wikiPageLinesWithoutHeaders = this.#removeHeader(wikiPageLines);
      this.#importResult = this.#generateWikiPageFacts(
        wikiPageLinesWithoutHeaders
      );
      console.log(
        "Imported " + this.#importResult.length + " wikiPageFact(s)."
      );
    } catch (error) {
      console.error(error);
    }
  }

  getResult() {
    return this.#importResult;
  }

  #removeHeader(data) {
    return data.slice(1);
  }

  #createArrayOfLines(rawData) {
    return rawData.split("\n");
  }

  #createRow(line) {
    return line.split("\t");
  }

  #generateWikiPageFacts(wikiPageFactLines) {
    const wikiPageFacts = [];
    for (const wikiPageFact of wikiPageFactLines) {
      const courseRow = this.#createRow(wikiPageFact);
      const { id, canvasId } = this.#extractIds(courseRow);
      if (!id || !canvasId) {
        continue;
      }
      const newCourse = new WikiCourse(id, canvasId);
      wikiPageFacts.push(newCourse);
    }
    return wikiPageFacts;
  }

  #extractIds(courseRow) {
    const id = courseRow[0];
    const canvasId = courseRow[1];
    return { id: id, canvasId: canvasId };
  }
}
