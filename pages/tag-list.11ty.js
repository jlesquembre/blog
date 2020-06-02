const { html } = require("@popeindustries/lit-html-server");

const { tagList, tagsAsHtml } = require("../utils/utils");

function summary(data) {
  return html`<h2>
    There are
    ${data.collections && data.collections.posts
      ? tagList(data.collections.posts).length
      : null}
    tags
  </h2>`;
}

module.exports = class {
  data() {
    return {
      eleventyComputed: {
        summary,
      },
      layout: "layouts/base.11ty.js",
      permalink: "/tags/",
      title: "Categories",
      sectionTitle: "categories",
    };
  }

  async render({ collections }) {
    const tags = tagList(collections.posts).map(
      (tag) => html`<a href="/tags/${tag}" class="tag">
        <span>${tag}</span><span> × ${collections[tag].length}</span>
      </a>`
    );

    return html`
      <h1>Categories</h1>

      <div class="tags-list">
        ${tags}
      </div>
    `;
  }
};
