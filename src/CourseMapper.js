import * as fs from "fs";
import Mapper from "./PageToCourseMapper.js";

/**
 * Map pages to course using wiki_page_fact table.
 */
export default class CourseMapper extends Mapper {
  async importPageFactFromFile(pathToFile) {
    try {
      const data = await fs.promises.readFile(pathToFile, "utf8");
    } catch (error) {
      console.error(error);
    }
  }
}
