export default class WikiPage {
  #id;
  #canvasId;
  #body;

  constructor(id, canvasId, body) {
    if (!id || typeof id !== "string") {
      throw `${this.constructor.name}: Args must be strings`;
    }
    if (!canvasId || typeof canvasId !== "string") {
      throw `${this.constructor.name}: Args must be strings`;
    }
    if (!body || typeof body !== "string") {
      throw `${this.constructor.name}: Args must be strings`;
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
