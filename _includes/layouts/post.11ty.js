const { html } = require("@popeindustries/lit-html-server");

const { readableDate, htmlDateString } = require("../../utils/date");
const { getHtmlTags, renderContent } = require("../../utils/utils");

function summary(data) {
  return html` <div>
      ${readableDate(data.page.date)}
    </div>
    <h3>${data.title}</h3>
    <div class="tags-list tags-side">
      ${getHtmlTags(data.tags)}
    </div>`;
}

module.exports = class {
  async data() {
    return {
      templateClass: "blog",
      layout: "layouts/base.11ty.js",
      eleventyComputed: {
        permalink: function (data) {
          return `/posts/${data.mySlug ? data.mySlug : data.page.fileSlug}/`;
        },
        summary: summary,
      },
      extraCss: "prism.css",
      sectionTitle: "blog",
    };
  }

  async render(data) {
    return html`
      <div class="date-tags-container">
        <time datetime=${htmlDateString(data.page.date)}
          >${readableDate(data.page.date)}</time
        >
        · ${getHtmlTags(data.tags)}
      </div>

      <h1>${data.title}</h1>

      ${renderContent(data.content)}

      <p><a href="/">← Home</a></p>
    `;
  }
};
