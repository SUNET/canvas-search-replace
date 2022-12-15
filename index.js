import * as dotenv from "dotenv";
dotenv.config();
import Substitution from "./Substitution.js";
import CanvasUpdateManager from "./CanvasUpdateManager.js";

const canvasApi = new Substitution(process.env.CF_API, process.env.NEW_API);
const canvasStatic = new Substitution(
  process.env.CF_STATIC,
  process.env.NEW_STATIC
);
const substitutions = [canvasApi, canvasStatic];

const update = new CanvasUpdateManager(substitutions);
await update.importPagesFromFile("./wiki_page_dim.txt");
console.log(update.getPages());
