import { isNonEmptyString } from "./Validator.js";

export default class ParentId {
  courseId;
  groupId;

  constructor(courseId, groupId) {
    if (!isNonEmptyString(courseId) && !isNonEmptyString(groupId)) {
      throw `${this.constructor.name}: eiter courseId or groupId must be present`;
    }
    this.courseId = courseId;
    this.groupId = groupId;
  }
}
