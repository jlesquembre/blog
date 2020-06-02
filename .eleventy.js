const fs = require("fs");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { minLocalPlugin } = require("./utils/minification");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    // Change which syntax highlighters are installed
    templateFormats: ["*"], // default
    // init callback lets you customize Prism
    // init: function({ Prism }) {
    //   Prism.languages.myCustomLanguage = /* */;
    // }

    // Added in 3.0, set to true to always wrap lines in `<span class="highlight-line">`
    // The default (false) only wraps when line numbers are passed in.
    alwaysWrapLineHighlights: false,
  });

  eleventyConfig.addPlugin(minLocalPlugin);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy({
    "_includes/img": "images",
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addLayoutAlias("post", "layouts/post.11ty.js");

  return {
    templateFormats: ["njk", "md", "11ty.js"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false,

    dir: {
      input: ".", // defaults to .
      includes: "_includes", // relative to input
      data: "_data", // relative to input
      output: "_output", // defaults to _site
    },
  };
};
