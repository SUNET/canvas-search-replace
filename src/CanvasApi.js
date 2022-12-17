import fetch from "node-fetch";

export default class CanvasApi {
  BEARER_TOKEN = `Bearer ${process.env.BEARER_TOKEN}`;
  CANVAS_API_URL = `${process.env.CANVAS_API_URL}/api/v1/courses/`;
  #ui;

  constructor(ui) {
    //TODO: fix validation
    this.#ui = ui;
  }

  async get(courseId, pageId) {
    const response = await fetch(
      this.CANVAS_API_URL + courseId + "/pages/page_id:" + pageId,
      {
        method: "get",
        headers: {
          Authorization: this.BEARER_TOKEN,
          "Content-Type": "application/json",
          Accept: "application/json+canvas-string-ids",
        },
      }
    );
    const status = response.status;
    if (String(status)[0] === "2") {
      this.#ui.renderSuccess("HTTP STATUS: " + status);
    } else {
      this.#ui.renderError("HTTP STATUS: " + status);
    }
    const data = await response.json();
    if (response.status !== 200) {
      this.#ui.renderError(response.statusText);
      return undefined;
    } else {
      return data;
    }
  }

  async put(courseId, pageId, newBody) {
    const response = await fetch(
      this.CANVAS_API_URL + courseId + "/pages/page_id:" + pageId,
      {
        method: "put",
        headers: {
          Authorization: this.BEARER_TOKEN,
          "Content-Type": "application/json",
          Accept: "application/json+canvas-string-ids",
        },
        body: JSON.stringify({ wiki_page: { body: newBody } }),
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      return undefined;
    } else {
      return data;
    }
  }
}
