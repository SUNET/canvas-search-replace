import { isString } from "./Validator.js";

export default class CanvasCourse {
  #pages = [];
  #id;
  #canvasId;

  constructor(id, canvasId) {
    if (isString(id) && isString(canvasId)) {
      this.#id = id;
      this.#canvasId = canvasId;
    } else {
      throw `${this.constructor.name}: id or canvasId is not string`;
    }
  }

  addPage(pageToAdd) {
    //TODO: validate input
    this.#pages.push(pageToAdd);
  }

  getPages() {
    return this.#pages;
  }

  getId() {
    return this.#canvasId;
  }
}
