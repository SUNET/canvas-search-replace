import { areNonEmptyStrings, isNonEmptyString } from "./Validator.js";

export default class WikiPageFact {
  #wikiPageId;
  #wikiId;
  #parentCourseId;
  #parentGroupId;

  constructor(wikiPageId, wikiId) {
    if (!areNonEmptyStrings([wikiPageId, wikiId])) {
      throw `${this.constructor.name}: arguments must be non-empty strings`;
    }
    this.#wikiPageId = wikiPageId;
    this.#wikiId = wikiId;
  }

  getWikiPageId() {
    return this.#wikiPageId;
  }

  getWikiId() {
    return this.#wikiId;
  }

  setParentCourseId(id) {
    if (isNonEmptyString(id)) {
      this.#parentCourseId = id;
    } else {
      throw `${this.constructor.name}: parentCourseId must be non-empty string`;
    }
  }

  setParentGroupId(id) {
    if (isNonEmptyString(id)) {
      this.#parentGroupId = id;
    } else {
      throw `${this.constructor.name}: parentGroupId must be non-empty string`;
    }
  }

  getParentGroupId() {
    return this.#parentGroupId;
  }

  getParentCourseId() {
    return this.#parentCourseId;
  }

  hasParentCourse() {
    return isNonEmptyString(this.#parentCourseId);
  }

  hasParentGroup() {
    return isNonEmptyString(this.#parentGroupId);
  }
}
