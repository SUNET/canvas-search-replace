import * as dotenv from "dotenv";
dotenv.config();

import Substitution from "./Substitution.js";
import CanvasPageImport from "./WikiPageImport.js";
import CanvasCourseImport from "./WikiCourseImport.js";
import WikiPageFactImport from "./WikiPageFactImport.js";

const canvasApi = new Substitution(process.env.CF_API, process.env.NEW_API);
const canvasStatic = new Substitution(
  process.env.CF_STATIC,
  process.env.NEW_STATIC
);

const substitutions = [canvasApi, canvasStatic];
const update = new CanvasPageImport(substitutions);
await update.importPagesFromFile("data/wiki_page_dim.txt");
const pagesToUpdate = update.getPages();

const courseImport = new CanvasCourseImport();
await courseImport.importCoursesFromFile("data/course_dim.txt");
const courses = courseImport.getCourses();

const wikiPageFactImport = new WikiPageFactImport();
await wikiPageFactImport.import("data/wiki_page_fact.txt");
const wikiPageFacts = wikiPageFactImport.getResult();
