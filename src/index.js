import * as dotenv from "dotenv";
dotenv.config();

import Substitution from "./Substitution.js";
import WikiPageFactFactory from "./WikiPageFactFactory.js";
import DataImporter from "./DataImporter.js";
import ParentFactory from "./ParentFactory.js";
import WikiPageFactory from "./WikiPageFactory.js";
import PageMapper from "./PageMapper.js";
import MappingRegister from "../MappingRegister.js";

const canvasApi = new Substitution(process.env.CF_API, process.env.NEW_API);
const canvasStatic = new Substitution(
  process.env.CF_STATIC,
  process.env.NEW_STATIC
);

const substitutions = [canvasApi, canvasStatic];
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
const pageParentMapper = new PageMapper(
  mappingRegister,
  wikiPages,
  wikiPageFacts
);
const mappings = await pageParentMapper.createMappings();
console.log(mappings.length, "mappings");
