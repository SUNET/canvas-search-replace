import MappingRegister from "./MappingRegister.js";
import DataImporter from "./DataImporter.js";
import ParentFactory from "./ParentFactory.js";
import Substitution from "./Substitution.js";
import WikiPage from "./WikiPage.js";
import WikiPageFact from "./WikiPageFact.js";
import ParentId from "./ParentId.js";
import ParentMapping from "./ParentMapping.js";

export const isNonEmptyString = (arg) => {
   return !arg || typeof arg !== "string" ? false : true
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

export const isParentId = (obj) => {
  return obj instanceof ParentId;
};

export const isMappingRegister = (obj) => {
  return obj instanceof MappingRegister;
};

export const areNonEmptyStrings = (argsToValidate) => {
  if (!argsToValidate) {
    return false;
  }
  let valid = true;
  argsToValidate.forEach((arg) => {
    if (!arg || typeof arg !== "string") {
      valid = false;
    }
  });
  return valid;
};

export const areWikiPageFacts = (objs) => {
  return areNonEmpty(objs, WikiPageFact);
};

export const areWikiPages = (objs) => {
  return areNonEmpty(objs, WikiPage);
};

export const areParentMappings = (objs) => {
  return areNonEmpty(objs, ParentMapping);
};

export const areSubstitutions = (objs) => {
  return areNonEmpty(objs, Substitution);
};

const areNonEmpty = (objs, type) => {
  if (!objs) {
    return false;
  }
  let valid = true;
  objs.forEach((obj) => {
    if (!obj || !(obj instanceof type)) {
      valid = false;
    }
  });
  return valid;
};
