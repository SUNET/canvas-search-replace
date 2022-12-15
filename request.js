import fetch from "node-fetch";

const BEARER_TOKEN = `Bearer ${process.env.BEARER_TOKEN}`;
const CANVAS_API_URL = `${process.env.CANVAS_API_URL}/api/v1/courses/`;
const COURSE = "216";
const PAGE = "1232";

const getPageBody = async (courseId, pageId) => {
  const response = await fetch(
    CANVAS_API_URL + COURSE + "/pages/page_id:" + PAGE,
    {
      method: "get",
      headers: {
        Authorization: BEARER_TOKEN,
        "Content-Type": "application/json",
        Accept: "application/json+canvas-string-ids",
      },
    }
  );
  const data = await response.json();
  return data.body;
};

console.log(await getPageBody(216, 1232));

const updatePageBody = async (course, page, newBody) => {
  const newBodyy =
    '<p>test from vscode</p>\n<p><a href="http://d38ynedpfya4s8.cloudfront.net/test">STATIC</a></p>\n<p><a class="inline_disabled" href="http://dchsou11xk84p.cloudfront.net/test" target="_blank">API</a></p>';
  const body = {
    wiki_page: {
      body: newBodyy,
    },
  };

  const response = await fetch(
    CANVAS_API_URL + COURSE + "/pages/page_id:" + PAGE,
    {
      method: "put",
      headers: {
        Authorization: BEARER_TOKEN,
        "Content-Type": "application/json",
        Accept: "application/json+canvas-string-ids",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
};
