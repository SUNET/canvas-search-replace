import { areNonEmptyStrings } from "./Validator.js";

export default class Substitution {
  #from;
  #to;

  constructor(from, to) {
    if (areNonEmptyStrings([from, to])) {
      this.#from = from;
      this.#to = to;
    } else {
      throw `${this.constructor.name}: From and to must be strings`;
    }
  }

  updateText(textToUpdate) {
    return textToUpdate.replaceAll(this.#from, this.#to);
  }

  getFrom() {
    return this.#from;
  }

  getTo() {
    return this.#to;
  }
}
