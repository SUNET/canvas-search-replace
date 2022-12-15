export default class Mapping {
  #childId;
  #parentId; // Group or Course

  constructor(childId, parentId) {
    //TODO: validate input
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
