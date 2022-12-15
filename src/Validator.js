import DataImporter from "./DataImporter.js";
import WikiPage from "./WikiPage.js";

export const isNonEmptyString = (arg) => {
  if (!arg || typeof arg !== "string") {
    return false;
  } else {
    return true;
  }
};

export const areNonEmptyStrings = (argsToValidate) => {
  let valid = true;
  argsToValidate.forEach((arg) => {
    if (!arg || typeof arg !== "string") {
      valid = false;
    }
  });
  return valid;
};

export const isWikiPage = (obj) => {
  return obj instanceof WikiPage;
};

export const isDataImporter = (obj) => {
  return obj instanceof DataImporter;
};
