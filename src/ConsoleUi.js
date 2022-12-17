import chalk from "chalk";

export default class ConsoleUi {
  #LINE = chalk.yellow("-------------------");
  #rl;

  constructor(rl) {
    this.#rl = rl;
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
}
