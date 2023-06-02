import { isParentId, isWikiPage } from "./Validator.js";

export default class ParentMapping {
  #parentId;
  #pages = [];

  constructor(parentId) {
    if (!isParentId(parentId)) {
      throw new Error(`${this.constructor.name}: Must be instance of ParentId`);
    }
    this.#parentId = parentId;
  }

  getParentId() {
    return this.#parentId;
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
}
