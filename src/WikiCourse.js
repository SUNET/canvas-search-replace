import { isString } from "./Validator.js";
import WikiPage from "./WikiPage.js";

export default class WikiCourse {
  #pages = [];
  #id;
  #canvasId;

  constructor(id, canvasId) {
    if (!isString(id) || !id)
      throw `${this.constructor.name}: id must be string`;

    if (!isString(canvasId) || !canvasId) {
      throw `${this.constructor.name}: canvasId must be string`;
    }
    this.#id = id;
    this.#canvasId = canvasId;
  }

  addPage(pageToAdd) {
    if (!pageToAdd instanceof WikiPage) {
      throw "Must be instance of WikiPage";
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
