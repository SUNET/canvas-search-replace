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

export default class App {
  #appData;
  #ui;

  constructor(appData, ui) {
    this.#appData = appData;
    this.#ui = ui;
  }

  async run() {
    let userAction;
    let options;
    while (userAction != ConsoleUi.MenuEvent.QUIT) {
      userAction = undefined;
      options = [];
      if (!this.#appData.hasWikiPages() || !this.#appData.hasWikiPageFacts()) {
        options.push(ConsoleUi.MenuEvent.IMPORT_PAGES);
      }
      if (
        this.#appData.hasWikiPages() &&
        this.#appData.hasWikiPageFacts() &&
        !this.#appData.hasCourses()
      ) {
        options.push(ConsoleUi.MenuEvent.IMPORT_COURSES);
      }
      if (
        this.#appData.hasWikiPages() &&
        this.#appData.hasWikiPageFacts() &&
        !this.#appData.hasGroups()
      ) {
        options.push(ConsoleUi.MenuEvent.IMPORT_GROUPS);
      }
      if (this.#appData.hasGroupsWithPages()) {
        options.push(ConsoleUi.MenuEvent.UPDATE_GROUPS);
      }
      if (this.#appData.hasCoursesWithPages()) {
        options.push(ConsoleUi.MenuEvent.UPDATE_COURSES);
      }
      options.push(ConsoleUi.MenuEvent.QUIT);
      this.#ui.renderMenu(options);
      while (!options.includes(userAction)) {
        userAction = await this.#ui.getUserAction(options);
      }
      await this.#handleUserAction(userAction);
    }
    this.#ui.close();
  }

  async #handleUserAction(userAction) {
    if (userAction == ConsoleUi.MenuEvent.IMPORT_PAGES) {
      await this.#importWikiPages();
      await this.#importWikiPageFacts();
      this.#doPageMappings();
    }
    if (userAction == ConsoleUi.MenuEvent.IMPORT_COURSES) {
      await this.#importCourses();
      this.#doCourseMappings();
    }
    if (userAction == ConsoleUi.MenuEvent.IMPORT_GROUPS) {
      await this.#importGroups();
      this.#doGroupMappings();
    }

    if (userAction == ConsoleUi.MenuEvent.UPDATE_COURSES) {
      await this.#updateCourses();
    }
  }

  async #importWikiPages() {
    const wpDataImporter = new DataImporter("data/wiki_page_dim.txt");
    const wpFactory = new WikiPageFactory(
      wpDataImporter,
      this.#appData.substitutions
    );
    this.#appData.wikiPages = await wpFactory.createWikiPages();
    this.#ui.renderImport(this.#appData.wikiPages.length, "wikiPages");
  }

  async #importWikiPageFacts() {
    const wpfDataImporter = new DataImporter("data/wiki_page_fact.txt");
    const wpfFactory = new WikiPageFactFactory(wpfDataImporter);
    this.#appData.wikiPageFacts = await wpfFactory.createWikiPageFacts(
      this.#appData.wikiPages
    );
    this.#ui.renderImport(this.#appData.wikiPageFacts.length, "wikiPageFacts");
  }
  async #importCourses() {
    const courseDataImporter = new DataImporter("data/course_dim.txt");
    const courseFactory = new ParentFactory(courseDataImporter);
    this.#appData.courses = await courseFactory.createParents();
    await this.#ui.renderImport(this.#appData.courses.length, "courses");
  }

  async #importGroups() {
    const groupDataImporter = new DataImporter("data/group_dim.txt");
    const groupFactory = new ParentFactory(groupDataImporter);
    this.#appData.groups = await groupFactory.createParents();
    await this.#ui.renderImport(this.#appData.groups.length, "groups");
  }

  #doPageMappings() {
    const mappingRegister = new MappingRegister();
    const pageMapper = new PageMapper(
      mappingRegister,
      this.#appData.wikiPages,
      this.#appData.wikiPageFacts
    );
    this.#appData.mappings = pageMapper.createMappings();
  }

  #doCourseMappings() {
    const mapper = new ParentMapper(this.#appData.mappings);
    this.#appData.coursesWithPages = mapper.createCoursesWithPages(
      this.#appData.courses
    );
    console.log(this.#appData.coursesWithPages.length, "courses has pages.");
  }

  #doGroupMappings() {
    const mapper = new ParentMapper(this.#appData.mappings);
    this.#appData.groupsWithPages = mapper.createGroupsWithPages(
      this.#appData.groups
    );
    console.log(this.#appData.groupsWithPages.length, "groups has pages.");
  }

  async #updateCourses() {
    const canvasApi = new CanvasApi(this.#ui);
    const updateManager = new UpdateManager(canvasApi, this.#ui);
    for await (const substitution of this.#appData.substitutions) {
      for await (const course of this.#appData.coursesWithPages) {
        await updateManager.updateParent(course, substitution);
      }
    }
  }
}
