import { isNonEmptyString, isWikiPage } from "./Validator.js";

export default class Parent {
  #pages = [];
  #id;
  #canvasId;

  constructor(id, canvasId) {
    if (!isNonEmptyString(id) || !id)
      throw new Error(`${this.constructor.name}: id must be string`);

    if (!isNonEmptyString(canvasId) || !canvasId) {
      throw new Error(`${this.constructor.name}: canvasId must be string`);
    }
    this.#id = id;
    this.#canvasId = canvasId;
  }

  addPage(pageToAdd) {
    if (!isWikiPage(pageToAdd)) {
      throw new Error(`${this.constructor.name}: Must be instance of WikiPage`);
    }
    this.#pages.push(pageToAdd);
  }

  getPages() {
    return this.#pages;
  }

  getCanvasId() {
    return this.#canvasId;
  }

  getId() {
    return this.#id;
  }
}
