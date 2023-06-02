import { ParentType } from "./ParentType.js";
import { areParentMappings } from "./Validator.js";

/**
 * Add pages to it parent.
 */
export default class ParentMapper {
  #pageMappings;

  constructor(pageMappings) {
    if (!areParentMappings(pageMappings)) {
      throw new Error("Arg must not instances of ParentMapping")
    }
    this.#pageMappings = pageMappings;
  }

  createCoursesWithPages(courses) {
    return this.#createParentsWithPages(courses, ParentType.COURSE);
  }

  createGroupsWithPages(groups) {
    return this.#createParentsWithPages(groups, ParentType.GROUP);
  }

  #createParentsWithPages(parents, parentType) {
    const parentsWithPages = [];
    this.#pageMappings.forEach((mapping) => {
      const parentId = mapping.getParentId();
      const parent = this.#getParent(parents, parentId, parentType);
      if (parent) {
        this.#addPagesToParent(parent, mapping.getPages());
        parentsWithPages.push(parent);
      }
    });
    return parentsWithPages;
  }

  #getParent(parents, parentId, type) {
    if (type === ParentType.COURSE) {
      return parents.find((p) => p.getId() === parentId.courseId);
    }
    if (type === ParentType.GROUP) {
      return parents.find((p) => p.getId() === parentId.groupId);
    }
  }

  #addPagesToParent(parent, pages) {
    pages.forEach((pageToAdd) => parent.addPage(pageToAdd));
  }
}
