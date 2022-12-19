import gitDiff from "git-diff";
import ConsoleUi from "./ConsoleUi.js";

export default class UpdateManager {
  #diffOptions = { color: true, noHeaders: true, wordDiff: true };
  #ui;
  #apiRequest;

  constructor(apiRequest, ui) {
    this.#ui = ui;
    this.#apiRequest = apiRequest;
  }

  async updateParent(parentToUpdate, substitution) {
    const courseId = parentToUpdate.getCanvasId();
    const pagesToUpdate = parentToUpdate.getPages();
    this.#ui.renderLine();
    this.#ui.renderHeader("Course id: " + courseId);
    for await (const page of pagesToUpdate) {
      await this.#updatePage(page, courseId, substitution);
      this.#ui.renderLine();
    }
    this.#ui.renderHeader("Course " + courseId + " was updated.");
  }

  async #updatePage(page, courseId, substitution) {
    this.#ui.renderNormal("Page id: " + page.getCanvasId());
    const response = await this.#apiRequest.get(courseId, page.getCanvasId());
    if (response) {
      const body = response.body;
      const newBody = substitution.updateText(body);
      if (this.#noDiff(body, newBody)) {
        this.#ui.renderSuccess("No diff.");
      } else {
        this.#preview(body, newBody);
        const commitDecision = await this.#getCommitAnswer();
        if (commitDecision) {
          const pageId = page.getCanvasId();
          await this.#apiRequest.put(courseId, pageId, newBody);
        } else {
          this.#ui.renderSuccess("don't commit");
        }
      }
    }
  }

  #preview(body, newBody) {
    console.log(gitDiff(body, newBody, this.#diffOptions));
  }

  async #getCommitAnswer() {
    const options = [ConsoleUi.Dialog.NO, ConsoleUi.Dialog.YES];
    const decision = await this.#ui.getCommitDecision(options);
    return decision === ConsoleUi.Dialog.YES ? true : false;
  }

  #noDiff(body, newBody) {
    return body === newBody;
  }
}
