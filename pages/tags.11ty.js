const { html } = require("@popeindustries/lit-html-server");

const { tagList, postListHtml } = require("../utils/utils");

module.exports = class {
  data() {
    return {
      sectionTitle: "categories",
      pagination: {
        data: "collections.posts",
        size: 1,
        alias: "tag",
        before: tagList,
        addAllPagesToCollections: true,
      },
      layout: "layouts/base.11ty.js",
      permalink: "/tags/{{tag}}",
      eleventyComputed: {
        // TODO use this once fixed on 11ty
        permalink: (data) => `/tags/${data.tag}/index.html`,
        title: (data) => `Tagged “${data.tag}”`,
      },
    };
  }

  async render({ tag, collections }) {
    return html`
      <h1>${tag}</h1>
      ${postListHtml(collections[tag])}
    `;
  }
};
