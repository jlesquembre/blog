const { html } = require("@popeindustries/lit-html-server");

const { postListHtml } = require("../utils/utils");

function summary(data) {
  return html`<h2>
    There are
    ${data.collections && data.collections.posts
      ? data.collections.posts.length
      : null}
    posts
  </h2>`;
}

module.exports = class {
  data() {
    return {
      eleventyComputed: {
        summary: summary,
      },
      layout: "layouts/base.11ty.js",
      permalink: "/posts/",
      title: "Archives",
      sectionTitle: "archives",
    };
  }

  async render({ collections, title }) {
    return html`
      <h1>${title}</h1>
      ${postListHtml(collections["posts"])}
    `;
  }
};
