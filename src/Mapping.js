import { isString } from "./Validator";

export default class Mapping {
  #childId;
  #parentId; // Group or Course

  constructor(childId, parentId) {
    if (!childId || !isString(childId)) {
      throw `${this.constructor.name}: childId must be string`;
    }
    if (!parentId || !isString(parentId)) {
      throw `${this.constructor.name}: parentId must be string`;
    }
    this.#childId = childId;
    this.#parentId = parentId;
  }

  getChildId() {
    return this.#childId;
  }

  getParentId() {
    return this.#parentId;
  }
}
