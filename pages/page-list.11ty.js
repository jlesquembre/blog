const { html } = require("@popeindustries/lit-html-server");
const {
  ifDefined,
} = require("@popeindustries/lit-html-server/directives/if-defined.js");

module.exports = class {
  data() {
    return {
      // permalink: "different/page-{{ pagination.pageNumber + 1 }}/index.html",
      eleventyComputed: {
        permalink: function (data) {
          // TODO
          // Hacky solution, 11ty calls this function with this data:
          // {"page":{"url":"(((((11ty(((((page.url)))))11ty)))))","outputPath":"(((((11ty(((((page.outputPath)))))11ty)))))"},"lastUpdate":"(((((11ty(((((lastUpdate)))))11ty)))))"}
          if (data.pagination == null) return;
          const pageN = data.pagination.pageNumber;
          return `/page-list/${pageN > 0 ? `${pageN}/` : ""}`;
        },
      },
      pagination: {
        data: "collections.all",
        size: 20,
        alias: "entries",
      },
      layout: "layouts/base.11ty.js",
    };
  }

  async render(data) {
    return html`
      <table>
        <thead>
          <th>URL</th>
          <th>Page Title</th>
        </thead>
        <tbody>
          ${data.entries.map(
            (entry) => html`
              <tr>
                <td>
                  <a href=${entry.url}><code>${entry.url}</code></a>
                </td>
                <td>${entry.data.title}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
      <ol>
        ${data.pagination.pages.map(function (_, index) {
          return html`<li>
            <a
              href=${data.pagination.hrefs[index]}
              aria-current=${ifDefined(
                data.page.url === data.pagination.hrefs[index]
                  ? "page"
                  : undefined
              )}
              >Page ${index + 1}</a
            >
          </li>`;
        })}
      </ol>
    `;
  }
};
