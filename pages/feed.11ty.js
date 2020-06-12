const { html, renderToString } = require("@popeindustries/lit-html-server");
const _ = require("lodash");
const { dateToISO } = require("../utils/date");

const normalizeUrl = require("normalize-url");
const { minify } = require("html-minifier");

// Validate result here:
// https://validator.w3.org/feed/

module.exports = class {
  //
  data() {
    return {
      eleventyExcludeFromCollections: false,
      eleventyComputed: {
        permalink: (data) => _.get(data, "metadata.feed.path"),
      },
    };
  }

  async render({ metadata, collections }) {
    const absUrl = (href) =>
      normalizeUrl(`${metadata.url}/${href}`, {
        stripWWW: false,
        forceHttps: true,
      });

    // const lastUpdate = dateToISO(_.last(collections.posts));
    const lastUpdate = dateToISO(new Date());

    const posts = _.orderBy(collections.posts, ["date"], ["desc"]);

    let feed = html`<?xml version="1.0" encoding="utf-8"?>
      <feed xmlns="http://www.w3.org/2005/Atom">
        <title>${metadata.title}</title>
        <link href=${absUrl(metadata.feed.path)} rel="self" />
        <link href=${metadata.url} />
        <updated>${lastUpdate}</updated>
        <id>${metadata.url}</id>
        <author>
          <name>${metadata.author.name}</name>
          <email>${metadata.author.email}</email>
        </author>
        ${posts.map((post) => {
          const absolutePostUrl = absUrl(post.url);
          return html`
            <entry>
              <title>${post.data.title}</title>
              <link href=${absolutePostUrl} />
              <updated>${dateToISO(post.date)}</updated>
              <id>${absolutePostUrl}</id>
              ${post.data.tags.map((tag) => html`<category term="${tag}" />`)}
              <content type="html">${post.templateContent}</content>
            </entry>
          `;
        })}
      </feed> `;
    feed = await renderToString(feed);
    return minify(feed, {
      collapseWhitespace: true,
      html5: false,
      keepClosingSlash: true,
      preserveLineBreaks: true,
    });
  }
};
