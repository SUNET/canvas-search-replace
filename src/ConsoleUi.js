import chalk from "chalk";

export default class ConsoleUi {
  static MenuEvent = {
    QUIT: "Quit",
    IMPORT_PAGES: "Import wikiPages and wikiPagefacts",
    IMPORT_COURSES: "Import courses",
    IMPORT_GROUPS: "Import groups",
    UPDATE_COURSES: "Update courses",
    UPDATE_GROUPS: "Update groups",
  };

  static Dialog = {
    YES: "Yes",
    NO: "No",
  };

  #LINE = chalk.yellow("------------------------------------------");
  #rl;
  #prompt = "> ";

  constructor(rl) {
    this.#rl = rl;
  }

  renderMenu(options) {
    this.renderLine();
    options.forEach((option, index) => {
      console.log(index + 1 + ". " + option);
    });
  }

  async getCommitDecision(options) {
    let option;
    while (!options.includes(option)) {
      const answer = await this.#rl.question("Accept change (y/n): ");
      if (answer === "y") {
        option = ConsoleUi.Dialog.YES;
      }
      if (answer === "n") {
        option = ConsoleUi.Dialog.NO;
      }
    }
    return option;
  }

  async getUserAction(options) {
    let option;
    while (!option) {
      const answer = await this.#rl.question(this.#prompt);
      option = options[answer - 1];
    }
    return option;
  }

  close() {
    this.#rl.close();
  }

  renderLine() {
    console.log(this.#LINE);
  }

  renderNormal(text) {
    console.log(chalk.whiteBright(text));
  }

  renderHeader(text) {
    console.log(chalk.white.bgBlue.bold(text));
  }

  renderError(text) {
    console.log(chalk.white.bgRed(text));
  }

  renderSuccess(text) {
    console.log(chalk.white.bgGreen(text));
  }

  renderImport(count, msg) {
    console.log(count, msg, "was imported.");
  }
}
