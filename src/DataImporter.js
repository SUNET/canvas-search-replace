import * as fs from "fs";

export default class DataImporter {
  #pathToFile;

  constructor(pathToFile) {
    this.#pathToFile = pathToFile;
  }

  async getData() {
    try {
      const data = await fs.promises.readFile(this.#pathToFile, "utf8");
      const lines = this.#createLines(data);
      return this.#removeHeader(lines);
    } catch (error) {
      console.error(error);
    }
  }

  #createLines(data) {
    return data.split("\n");
  }

  #removeHeader(data) {
    return data.slice(1);
  }
}
