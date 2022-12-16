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
      throw `${this.constructor.name}: Mapping with id ${parentId} does not exist.`;
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
      if (m.getParentId() === parentId) {
        match = m;
      }
    });
    return match;
  }

  #noMappings() {
    return this.#mappings.length === 0;
  }
}
