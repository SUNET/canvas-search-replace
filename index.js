import * as dotenv from "dotenv";
dotenv.config();
import Substitution from "./Substitution.js";
import CanvasPageImport from "./CanvasPageImport.js";
import CourseMapper from "./CourseMapper.js";
import CanvasCourse from "./CanvasCourse.js";
import CanvasCourseImport from "./CanvasCourseImport.js";

const canvasApi = new Substitution(process.env.CF_API, process.env.NEW_API);
const canvasStatic = new Substitution(
  process.env.CF_STATIC,
  process.env.NEW_STATIC
);
const substitutions = [canvasApi, canvasStatic];
const update = new CanvasPageImport(substitutions);
await update.importPagesFromFile("./wiki_page_dim.txt");
const pagesToUpdate = update.getPages();

const courseMapper = new CourseMapper();
// courseMapper.importPageFactFromFile("./wiki_page_fact.txt");

const courseImport = new CanvasCourseImport();
await courseImport.importCoursesFromFile("./course_dim.txt");
const courses = courseImport.getCourses();
