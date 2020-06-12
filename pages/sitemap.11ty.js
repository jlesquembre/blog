const { html, renderToString } = require("@popeindustries/lit-html-server");
const { htmlDateString } = require("../utils/date");

const normalizeUrl = require("normalize-url");
const { minify } = require("html-minifier");

module.exports = class {
  //
  data() {
    return {
      eleventyExcludeFromCollections: false,
      permalink: "/sitemap.xml",
    };
  }

  async render({ metadata, collections }) {
    const absUrl = (href) =>
      normalizeUrl(`${metadata.url}/${href}`, {
        stripWWW: false,
        forceHttps: true,
      });

    let sitemap = html`<?xml version="1.0" encoding="utf-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${collections.all.map((page) => {
          const absoluteUrl = absUrl(page.url);
          return html`
            <url>
              <loc>${absoluteUrl}</loc>
              <lastmod>${htmlDateString(page.data.lastUpdate)}</lastmod>
            </url>
          `;
        })}
      </urlset> `;
    sitemap = await renderToString(sitemap);
    return minify(sitemap, {
      collapseWhitespace: true,
      html5: false,
      keepClosingSlash: true,
      preserveLineBreaks: true,
    });
  }
};
