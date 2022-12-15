export default class WikiPage {
  #id;
  #canvasId;
  #body;

  constructor(id, canvasId, body) {
    if (!id || typeof id !== "string") {
      throw `${this.constructor.name}: id must be string`;
    }
    if (!canvasId || typeof canvasId !== "string") {
      throw `${this.constructor.name}: canvasId must be string`;
    }
    if (!body || typeof body !== "string") {
      throw `${this.constructor.name}: body must be string`;
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
