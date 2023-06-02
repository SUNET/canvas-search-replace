import { areNonEmptyStrings } from "./Validator.js";

export default class WikiPage {
  #id;
  #canvasId;

  constructor(id, canvasId) {
    if (!areNonEmptyStrings([id, canvasId])) {
      throw new Error(`${this.constructor.name}: args must be non empty strings`);
    }
    this.#id = id;
    this.#canvasId = canvasId;
  }

  getId() {
    return this.#id;
  }

  getCanvasId() {
    return this.#canvasId;
  }
}
