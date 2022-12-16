import Parent from "./Parent.js";
import { isDataImporter } from "./Validator.js";

export default class ParentFactory {
  #dataImporter;

  constructor(dataImporter) {
    if (!isDataImporter(dataImporter)) {
      throw `${this.constructor.name}: arguments must instance of DataImporter`;
    }
    this.#dataImporter = dataImporter;
  }

  async createParents() {
    const linesOfData = await this.#dataImporter.getData();
    return this.#generateParents(linesOfData);
  }

  #generateParents(linesOfData) {
    const parents = [];
    for (const lineOfData of linesOfData) {
      const newParent = this.#createParent(lineOfData);
      if (newParent) {
        parents.push(newParent);
      }
    }
    return parents;
  }

  #createParent(lineOfData) {
    const parentRow = this.#createRow(lineOfData);
    const { id, canvasId } = this.#extractIds(parentRow);
    if (!id || !canvasId) {
      return;
    }
    return new Parent(id, canvasId);
  }

  #extractIds(parentRow) {
    const id = parentRow[0];
    const canvasId = parentRow[1];
    return { id, canvasId };
  }

  #createRow(line) {
    return line.split("\t");
  }
}
