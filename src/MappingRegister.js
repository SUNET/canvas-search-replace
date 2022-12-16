export default class MappingRegister {
  #mappings = [];

  getMappings() {
    return this.#mappings;
  }

  add(mappingToAdd) {
    if (this.#getMappingFromRegister(mappingToAdd.getParentId())) {
      throw `${this.constructor.name}: Mapping already exists`;
    }
    this.#mappings.push(mappingToAdd);
  }

  getMapping(parentId) {
    const mapping = this.#getMappingFromRegister(parentId);
    if (!mapping) {
      throw `${this.constructor.name}: Mapping does not exist.`;
    }
    return mapping;
  }

  hasMapping(parentId) {
    if (this.#noMappings()) {
      return false;
    }
    const mapping = this.#getMappingFromRegister(parentId);
    if (!mapping) {
      return false;
    } else {
      return true;
    }
  }

  #getMappingFromRegister(parentId) {
    let match;
    this.#mappings.forEach((m) => {
      const courseId = m.getParentId().courseId;
      const groupId = m.getParentId().groupId;
      if (this.#courseMatch(parentId, courseId)) {
        match = m;
      }
      if (this.#groupMatch(parentId, groupId)) {
        match = m;
      }
    });
    return match;
  }

  #noMappings() {
    return this.#mappings.length === 0;
  }

  #courseMatch(parentId, courseId) {
    return courseId && parentId.courseId === courseId;
  }

  #groupMatch(parentId, groupId) {
    return groupId && parentId.groupId === groupId;
  }
}
