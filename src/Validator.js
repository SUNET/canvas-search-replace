import MappingRegister from "../MappingRegister.js";
import DataImporter from "./DataImporter.js";
import ParentFactory from "./ParentFactory.js";
import Substitution from "./Substitution.js";
import WikiPage from "./WikiPage.js";
import WikiPageFact from "./WikiPageFact.js";

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

export const isSubstitution = (obj) => {
  return obj instanceof Substitution;
};

export const isParentFactory = (obj) => {
  return obj instanceof ParentFactory;
};

export const isMappingRegister = (obj) => {
  return obj instanceof MappingRegister;
};

export const areWikiPageFacts = (objs) => {
  let valid = true;
  objs.forEach((obj) => {
    if (!obj || !(obj instanceof WikiPageFact)) {
      valid = false;
    }
  });
  return valid;
};

export const areWikiPages = (objs) => {
  let valid = true;
  objs.forEach((obj) => {
    if (!obj || !(obj instanceof WikiPage)) {
      valid = false;
    }
  });
  return valid;
};
