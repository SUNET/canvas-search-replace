import { areNonEmptyStrings } from "./Validator.js";

export default class WikiPage {
  #id;
  #canvasId;
  #body;

  constructor(id, canvasId, body) {
    if (!areNonEmptyStrings([id, canvasId, body])) {
      throw `${this.constructor.name}: args must be non empty strings`;
    }
    this.#id = id;
    this.#canvasId = canvasId;
    this.#body = body;
  }

  getId() {
    return this.#id;
  }

  getCanvasId() {
    return this.#canvasId;
  }

  getBody() {
    return this.#body;
  }
}
