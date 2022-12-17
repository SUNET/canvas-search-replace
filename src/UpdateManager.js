import gitDiff from "git-diff";

export default class UpdateManager {
  #diffOptions = { color: true, noHeaders: true, wordDiff: true };
  #substitution;
  #ui;
  #apiRequest;

  constructor(substitution, apiRequest, ui) {
    this.#substitution = substitution;
    this.#ui = ui;
    this.#apiRequest = apiRequest;
  }

  async updateCourse(courseToUpdate) {
    const courseId = courseToUpdate.getCanvasId();
    const pagesToUpdate = courseToUpdate.getPages();
    this.#ui.renderHeader("Course id: " + courseId);
    for await (const page of pagesToUpdate) {
      await this.#updatePage(page, courseId);
      this.#ui.renderLine();
    }
    this.#ui.renderHeader("Course " + courseId + " was updated.");
    this.#ui.renderLine();
  }

  async #updatePage(page, courseId) {
    this.#ui.renderNormal("Page id: " + page.getCanvasId());
    const response = await this.#apiRequest.get(courseId, page.getCanvasId());
    if (response) {
      const body = response.body;
      const newBody = this.#substitution.updateText(body);
      if (this.#noDiff(body, newBody)) {
        this.#ui.renderSuccess("NO DIFF, NEXT PAGE.");
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
    let answer;
    while (answer !== "n" && answer !== "y") {
      answer = await this.#ui.rl.question("Accept change? y/n");
      answer = answer.toLowerCase();
    }
    return answer === "y" ? true : false;
  }

  #noDiff(body, newBody) {
    return body === newBody;
  }
}
