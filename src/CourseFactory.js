import Course from "./Course.js";
import { isDataImporter } from "./Validator.js";

export default class CourseFactory {
  #dataImporter;

  constructor(dataImporter) {
    if (!isDataImporter(dataImporter)) {
      throw `${this.constructor.name}: arguments must instance of DataImporter`;
    }
    this.#dataImporter = dataImporter;
  }

  async createCourses() {
    const linesOfData = await this.#dataImporter.getData();
    return this.#generateCourses(linesOfData);
  }

  #generateCourses(linesOfData) {
    const courses = [];
    for (const lineOfData of linesOfData) {
      const newCourse = this.#createCourse(lineOfData);
      if (newCourse) {
        courses.push(newCourse);
      }
    }
    return courses;
  }

  #createCourse(lineOfData) {
    const courseRow = this.#createRow(lineOfData);
    const { id, canvasId } = this.#extractIds(courseRow);
    if (!id || !canvasId) {
      return;
    }
    return new Course(id, canvasId);
  }

  #extractIds(courseRow) {
    const id = courseRow[0];
    const canvasId = courseRow[1];
    return { id, canvasId };
  }

  #createRow(line) {
    return line.split("\t");
  }
}
