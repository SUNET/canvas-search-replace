import * as fs from "fs";
import WikiCourse from "./WikiCourse.js";

export default class CanvasCourseImport {
  #courses = [];

  async importCoursesFromFile(pathToFile) {
    try {
      const data = await fs.promises.readFile(pathToFile, "utf8");
      this.#courses = this.#generateCourses(data);
      console.log("Imported " + this.#courses.length + " courses.");
    } catch (error) {
      console.error(error);
    }
  }

  getCourses() {
    return this.#courses;
  }

  #removeHeader(data) {
    return data.slice(1);
  }

  #generateCourses(coursesRawData) {
    const courses = [];
    for (const page of this.#removeHeader(coursesRawData.split("\n"))) {
      const courseRow = page.split("\t");
      const { id, canvasId } = this.#extractIds(courseRow);
      if (!id || !canvasId) {
        continue;
      }
      const newCourse = new WikiCourse(id, canvasId);
      courses.push(newCourse);
    }
    return courses;
  }

  #extractIds(courseRow) {
    const id = courseRow[0];
    const canvasId = courseRow[1];
    return { id: id, canvasId: canvasId };
  }
}
