// https://github.com/11ty/11ty-website/blob/master/config/minification.js
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const Terser = require("terser");
const SVGO = require("svgo");
const fs = require("fs");
const path = require("path");

const svgo = new SVGO({
  plugins: [
    {
      removeXMLNS: true,
      removeUselessStrokeAndFill: false,
      removeViewBox: false,
      removeDimensions: true,
    },
  ],
});

function minCss(code, force = false) {
  if (process.env.ELEVENTY_PRODUCTION || force) {
    return new CleanCSS({}).minify(code).styles;
  }
  return code;
}

async function minSvg(code) {
  const result = await svgo.optimize(code);
  return Buffer.from(result.data);
}

/**
 * Get content files concatenated.
 * Paths relative to the project `_includes` directory, unless starts with:
 * `/` -> absoute path
 * `.` -> relative to the project's root
 */
function getContents(...paths) {
  return paths
    .map((p) => {
      if (path.isAbsolute(p)) return p;
      if (p.startsWith(".")) return path.join(__dirname, "..", p);
      return path.join(__dirname, "../_includes", p);
    })
    .map((p) => fs.readFileSync(p))
    .join("\n");
}

const minLocalPlugin = (eleventyConfig) => {
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addFilter("jsmin", function (code) {
    if (process.env.ELEVENTY_PRODUCTION) {
      let minified = Terser.minify(code);
      if (minified.error) {
        console.log("Terser error: ", minified.error);
        return code;
      }

      return minified.code;
    }
    return code;
  });

  eleventyConfig.addFilter("cssmin", minCss);
  eleventyConfig.addNunjucksAsyncFilter("svgmin", function (code, callback) {
    svgo
      .optimize(code)
      .then((result) => callback(null, Buffer.from(result.data)));
  });
};

module.exports = { minCss, minSvg, getContents, minLocalPlugin };
