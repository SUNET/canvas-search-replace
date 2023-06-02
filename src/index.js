import * as dotenv from "dotenv";
dotenv.config();

import * as readline from "readline/promises";
import { data as substitutionData } from "../data/substitutions.js";
import ConsoleUi from "./ConsoleUi.js";
import App from "./App.js";
import AppData from "./AppData.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const consoleUi = new ConsoleUi(rl);

const appData = new AppData();
appData.loadSubstitutions(substitutionData);
const app = new App(appData, consoleUi);
app.run().catch(e => console.error(e));
