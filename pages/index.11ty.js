const { html } = require("@popeindustries/lit-html-server");

const { postTitleHtml } = require("../utils/utils");

module.exports = class {
  data() {
    return {
      layout: "layouts/base.11ty.js",
      permalink: "/",
      extraCss: "prism.css",
    };
  }

  async render({ collections }) {
    const posts = collections.posts
      .slice(Math.max(collections.posts.length - 5, 0))
      .map(postTitleHtml)
      .reverse();
    return html`
      <h1>Latest posts</h1>
      ${posts}
      <a href="/posts/" class="posts-link posts-link-more"
        >…see full archives.</a
      >
    `;
  }
};
