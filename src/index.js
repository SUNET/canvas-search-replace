import * as dotenv from "dotenv";
dotenv.config();

import Substitution from "./Substitution.js";
import CanvasPageImport from "./WikiPageImport.js";
import WikiPageFactFactory from "./WikiPageFactFactory.js";
import DataImporter from "./DataImporter.js";
import CourseFactory from "./CourseFactory.js";

const canvasApi = new Substitution(process.env.CF_API, process.env.NEW_API);
const canvasStatic = new Substitution(
  process.env.CF_STATIC,
  process.env.NEW_STATIC
);

const substitutions = [canvasApi, canvasStatic];
const update = new CanvasPageImport(substitutions);
await update.importPagesFromFile("data/wiki_page_dim.txt");
const pagesToUpdate = update.getPages();

const courseDataImporter = new DataImporter("data/course_dim.txt");
const courseFactory = new CourseFactory(courseDataImporter);
const courses = await courseFactory.createCourses();
console.log(courses.length, "courses");

const wpfDataImporter = new DataImporter("data/wiki_page_fact.txt");
const wpfFactory = new WikiPageFactFactory(wpfDataImporter);
const wikiPageFacts = await wpfFactory.createWikiPageFacts();
console.log(wikiPageFacts.length, "wikiPageFacts");
