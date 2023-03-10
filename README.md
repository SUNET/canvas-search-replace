# canvas-search-replace

Helper tool for programmatic search and replace operations using canvas api

## Description

This app reads tables, as txt files, from a Canvas data dump. It lets the user perform search and replace operations on Canvas resources via its REST API.

![](./img/architecture.png)

## Installation

1. clone this repo
2. `npm install`
3. `mkdir data`

## Usage

### Tables from Canvas data dump

Sync and unpack the following tables from Canvas Data dump:

1. wiki_page_dim
2. wiki_page_fact
3. group_dim
4. course_dim

Move the txt-files to `data/`  
Canvas Data Schema Documentation: https://portal.inshosteddata.com/docs  
Canvas Data CLI Tool (with video tutorials): https://community.canvaslms.com/t5/Canvas-Data-Users/How-to-Use-the-CLI-Data-Tool/ta-p/421486

### Define your substitutions

Create `substitutions.js` in `data/`.  
It's a javascript file with the search and replace operations you wish to do.  
Syntax:

```js
export const data = [
  { from: "d38ynedpfya4s8.cloudfront.net", to: "vod-cache.kaltura.nordu.net" },
  { from: "dchsou11xk84p.cloudfront.net", to: "api.kaltura.nordu.net" },
];
```

### Environment variables

The app expects these environmental variables to be set:

```ini
BEARER_TOKEN=YOUR_BEARER_TOKEN_HERE
CANVAS_API_URL=https://YOUR_INSTITUTION.instructure.com
```

Bearer token is used in http header to authenticate with Canvas API. You need to create a token in Canvas: https://canvas.instructure.com/doc/api/index.html

### Run the app

`npm run start`

Importing pages from `wiki_page_dim.txt`  
![](./img/import_pages.png)

Importing courses from `course_dim.txt`  
![](./img/import_courses.png)

Updating courses. Word diff review before commit  
![](./img/course_update_git_diff.png)

If run again after update, we get no diff.  
![](./img/course_update_no_diff.png)

If the page has been deleted we will get a 403 forbidden.  
![](./img/page_deleted_forbidden.png)
