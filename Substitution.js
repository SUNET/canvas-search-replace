import { isString } from "./Validator.js";

export default class Substitution {
  #from;
  #to;

  constructor(from, to) {
    if (isString(from) && isString(to)) {
      this.#from = from;
      this.#to = to;
    } else {
      throw "Substitution: From and to must be strings";
    }
  }

  getFrom() {
    return this.#from;
  }

  getTo() {
    return this.#to;
  }
}
