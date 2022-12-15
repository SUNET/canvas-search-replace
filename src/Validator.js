import WikiPage from "./WikiPage";

export const isString = (input) => {
  return typeof input == "string";
};

export const isWikiPage = (obj) => {
  return obj instanceof WikiPage;
};
