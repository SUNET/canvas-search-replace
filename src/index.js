import * as dotenv from "dotenv";
dotenv.config();
import * as readline from "readline/promises";

import Substitution from "./Substitution.js";
import WikiPageFactFactory from "./WikiPageFactFactory.js";
import DataImporter from "./DataImporter.js";
import ParentFactory from "./ParentFactory.js";
import WikiPageFactory from "./WikiPageFactory.js";
import PageMapper from "./PageMapper.js";
import MappingRegister from "./MappingRegister.js";
import ParentMapper from "./ParentMapper.js";
import UpdateManager from "./UpdateManager.js";
import CanvasApi from "./CanvasApi.js";
import ConsoleUi from "./ConsoleUi.js";

const kalturaApi = new Substitution(process.env.CF_API, process.env.NEW_API);
const kalturaStatic = new Substitution(
  process.env.CF_STATIC,
  process.env.NEW_STATIC
);
const substitutions = [kalturaApi, kalturaStatic];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const consoleUi = new ConsoleUi(rl);

const wpDataImporter = new DataImporter("data/wiki_page_dim.txt");
const wpFactory = new WikiPageFactory(wpDataImporter, substitutions);
const wikiPages = await wpFactory.createWikiPages();
console.log(wikiPages.length, "wikiPages");

const courseDataImporter = new DataImporter("data/course_dim.txt");
const courseFactory = new ParentFactory(courseDataImporter);
const courses = await courseFactory.createParents();
console.log(courses.length, "courses");

const groupDataImporter = new DataImporter("data/group_dim.txt");
const groupFactory = new ParentFactory(groupDataImporter);
const groups = await groupFactory.createParents();
console.log(groups.length, "groups");

const wpfDataImporter = new DataImporter("data/wiki_page_fact.txt");
const wpfFactory = new WikiPageFactFactory(wpfDataImporter);
const wikiPageFacts = await wpfFactory.createWikiPageFacts();
console.log(wikiPageFacts.length, "wikiPageFacts");

const mappingRegister = new MappingRegister();
const pageMapper = new PageMapper(mappingRegister, wikiPages, wikiPageFacts);
const mappings = await pageMapper.createMappings();
console.log(mappings.length, "mappings");

const courseMapper = new ParentMapper(mappings);
const coursesWithPages = courseMapper.createCoursesWithPages(courses);
const groupsWithPages = courseMapper.createGroupsWithPages(groups);
console.log(coursesWithPages.length, "courses has pages");
console.log(groupsWithPages.length, "groups has pages");

const api = new CanvasApi(consoleUi);
const updateApi = new UpdateManager(kalturaApi, api, consoleUi);
for await (const course of coursesWithPages) {
  await updateApi.updateCourse(course);
}
const updateStatic = new UpdateManager(kalturaStatic, api, consoleUi);
for await (const course of coursesWithPages) {
  await updateStatic.updateCourse(course);
}
consoleUi.close();
