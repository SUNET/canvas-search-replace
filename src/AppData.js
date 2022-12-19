import Substitution from "./Substitution.js";

export default class AppData {
  substitutions = [];
  wikiPages = [];
  wikiPageFacts = [];
  mappings = [];
  courses = [];
  coursesWithPages = [];
  groups = [];
  groupsWithPages = [];

  loadSubstitutions(data) {
    data.forEach((sub) => {
      const substitutionToAdd = new Substitution(sub.from, sub.to);
      this.substitutions.push(substitutionToAdd);
    });
  }

  hasWikiPages() {
    return this.wikiPages.length > 0;
  }

  hasWikiPageFacts() {
    return this.wikiPageFacts.length > 0;
  }

  hasCourses() {
    return this.courses.length > 0;
  }

  hasGroups() {
    return this.groups.length > 0;
  }

  hasCoursesWithPages() {
    return this.coursesWithPages.length > 0;
  }

  hasGroupsWithPages() {
    return this.groupsWithPages.length > 0;
  }
}
