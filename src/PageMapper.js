import ParentMapping from "./ParentMapping.js";
import ParentId from "./ParentId.js";
import {
  areWikiPageFacts,
  areWikiPages,
  isMappingRegister,
} from "./Validator.js";

/**
 * Maps a page to its parentId.
 */
export default class PageMapper {
  #register;
  #wikiPages;
  #wikiPageFacts;

  constructor(register, wikiPages, wikiPageFacts) {
    if (!isMappingRegister(register)) {
      throw `${this.constructor.name}: Must be instances of MappingRegister`;
    }
    if (!areWikiPages(wikiPages)) {
      throw `${this.constructor.name}: Must be instances of WikiPage`;
    }
    if (!areWikiPageFacts(wikiPageFacts)) {
      throw `${this.constructor.name}: Must be instances of WikiPageFacts`;
    }
    this.#register = register;
    this.#wikiPages = wikiPages;
    this.#wikiPageFacts = wikiPageFacts;
  }

  createMappings() {
    this.#wikiPages.forEach((wikiPageToMap) => {
      const parentId = this.#getParentIdOfPage(wikiPageToMap.getId());
      const mappingExists = this.#register.hasMapping(parentId);
      if (mappingExists) {
        const mapping = this.#register.getMapping(parentId);
        mapping.addPage(wikiPageToMap);
      } else {
        const newMapping = this.#createMapping(wikiPageToMap);
        this.#register.add(newMapping);
      }
    });
    return this.#register.getMappings();
  }

  #createMapping(wikiPageToMap) {
    const wikiPageId = wikiPageToMap.getId();
    const parentId = this.#getParentIdOfPage(wikiPageId);
    const newMapping = new ParentMapping(parentId);
    newMapping.addPage(wikiPageToMap);
    return newMapping;
  }

  #getParentIdOfPage(wikiPageId) {
    const wpfMatch = this.#getWikiPageFact(wikiPageId);
    const groupId = wpfMatch.getParentGroupId();
    const courseId = wpfMatch.getParentCourseId();
    return new ParentId(courseId, groupId);
  }

  #getWikiPageFact(wikiPageId) {
    let wpfMatch;
    this.#wikiPageFacts.forEach((wpf) => {
      if (wpf.getWikiPageId() === wikiPageId) {
        wpfMatch = wpf;
      }
    });
    if (!wpfMatch) {
      throw `${this.constructor.name}: Did not find WikiPageFact for WikiPage id ${wikiPageId}`;
    }
    return wpfMatch;
  }
}
