const { html } = require("@popeindustries/lit-html-server");
const {
  unsafeHTML,
} = require("@popeindustries/lit-html-server/directives/unsafe-html.js");
const fp = require("lodash/fp");
const { htmlDateString, readableDate } = require("./date");

const SPECIAL_TAGS = new Set(["all", "nav", "post", "posts"]);

/**
 * Given a collection, returns all its tags
 *
 */
function tagList(collection) {
  let tags = new Set(
    // collection.map((x) => x.data.tags).reduce((acc, val) => acc.concat(val), [])
    collection.map((x) => x.data.tags).flat()
  );
  tags = Array.from(tags);
  return getTags(tags);
}

/**
 * Given a collection, group it by year
 * @returns a Map
 */
function groupByYear(collection) {
  return new Map(
    fp.flow(
      fp.orderBy(["date"], ["desc"]),
      fp.groupBy((x) => new Date(x.date).getFullYear()),
      fp.toPairs,
      fp.orderBy(fp.first, ["desc"])
    )(collection)
  );
}

/**
 * For a list of tags, remove the special ones and sort by name
 */
function getTags(tags) {
  return tags.filter((x) => !SPECIAL_TAGS.has(x)).sort();
}
function tagsAsHtml(tags) {
  return tags.map(
    (tag) => html`<a href="/tags/${tag}" class="tag">
      <span>${tag}</span>
    </a>`
  );
}
function getHtmlTags(item) {
  return tagsAsHtml(getTags(item));
}

function postTitleHtml(post) {
  return html`
    <div class="postlist-item">
      <time class="postlist-date" datetime=${htmlDateString(post.date)}
        >${readableDate(post.date)}</time
      >
      <a href=${post.url}>
        <h2>${post.data.title}</h2>
      </a>
      ${getHtmlTags(post.data.tags)}
    </div>
  `;
}

function postListHtml(collection) {
  const postsByYear = groupByYear(collection);
  return Array.from(postsByYear.entries()).map(([year, posts]) => {
    return html`<div class="year-header" id=${year}>
        <div>${year}</div>
        <span>×${postsByYear.get(year).length}</span>
      </div>
      ${posts.map(postTitleHtml)} `;
  });
}

function renderContent(content) {
  if (typeof content === "string") return unsafeHTML(content);
  return content;
}

module.exports = {
  renderContent,
  getTags,
  getHtmlTags,
  tagList,
  groupByYear,
  postTitleHtml,
  postListHtml,
  tagsAsHtml,
};
