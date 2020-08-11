const { html, renderToString } = require("@popeindustries/lit-html-server");
const {
  unsafeHTML,
} = require("@popeindustries/lit-html-server/directives/unsafe-html.js");
const compareUrls = require("compare-urls");
const fs = require("fs");
const {
  classMap,
} = require("@popeindustries/lit-html-server/directives/class-map.js");

const { minCss, minSvg, getContents } = require("../../utils/minification");
const { renderContent } = require("../../utils/utils");

class Render {
  async render(data) {
    return renderToString(this._render(data));
  }
}

function extraCss(...files) {
  return files
    .filter((f) => f != null)
    .map((f) => html`<link rel="stylesheet" href="/css/${f}" />`);
}

module.exports = class extends Render {
  data() {
    return {
      eleventyComputed: {
        lastUpdate: function (data) {
          const input = data.page.inputPath;
          // TODO
          // Hacky solution, 11ty calls this function with this data:
          // {"page":{"url":"(((((11ty(((((page.url)))))11ty)))))","outputPath":"(((((11ty(((((page.outputPath)))))11ty)))))"},"lastUpdate":"(((((11ty(((((lastUpdate)))))11ty)))))"}
          if (input == null) return;
          return fs.statSync(input)["mtime"];
        },
      },
      navMenu: [
        ["/about", "About"],
        ["/tags", "Categories"],
        ["/posts", "Archives"],
      ],
    };
  }

  async _render(data) {
    const jsModules = data.modules || [];
    const navClasses = (url) => {
      return classMap({
        "nav-item": true,
        "nav-item-active": compareUrls(data.permalink, url),
      });
    };

    const css = minCss(
      getContents(
        require.resolve("modern-css-reset"),
        "css/colors.css",
        "css/index.css"
      )
    );

    const title = data.title
      ? `${data.title} | ${data.metadata.title}`
      : data.metadata.title;

    return html`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>${title}</title>
          <meta
            name="Description"
            content=${data.description || data.metadata.description}
          />
          <link
            rel="alternate"
            href=${data.metadata.feed.path}
            type="application/atom+xml"
            title=${data.metadata.title}
          />
          ${jsModules.map(
            (file) =>
              html`<script type="module" src="/js-modules/${file}"></script>
                '`
          )}
          <style>
            ${unsafeHTML(css)}
          </style>
          ${extraCss(data.extraCss)}
        </head>
        <body>
          ${process.env.DEV
            ? html`<a href="/page-list" id="all-pages">All pages</a>`
            : ""}
          <header class="side">
            <a href="/">
              <h1 class="title">
                ${data.metadata.title}
              </h1>
            </a>

            <div class="sticky">
              <div class="social">
                <a
                  class="social-icon icon-github"
                  href="https://github.com/jlesquembre"
                  title="@jlesquembre on GitHub"
                >
                  ${await minSvg(getContents("img/icons/github.svg"))}
                </a>
                <a
                  class="social-icon icon-twitter"
                  href="https://twitter.com/jlesquembre"
                  title="@jlesquembre on Twitter"
                >
                  ${await minSvg(getContents("img/icons/twitter.svg"))}
                </a>
                <a
                  class="social-icon icon-feed"
                  href=${data.metadata.feed.path}
                  title="José Luis Lafuente's RSS Feed"
                >
                  ${await minSvg(getContents("img/icons/feed.svg"))}
                </a>
                <a href="/" id="home">Home</a>
              </div>

              <div class="summary-container">
                <h1 class="section-header">${data.sectionTitle}</h1>
                <div class="summary">${data.summary}</div>
              </div>
            </div>
          </header>

          <main class=${classMap({ [data.templateClass]: data.templateClass })}>
            ${renderContent(data.content)}
          </main>

          <footer class="side">
            ${data.navMenu.map(
              ([link, title]) => html`
                <a href=${link}>
                  <div class=${navClasses(link)}>
                    ${title}
                  </div>
                </a>
              `
            )}
          </footer>
        </body>
      </html>`;
  }
};
