const { minCss, getContents } = require("../../utils/minification");

module.exports = class {
  data() {
    return {
      permalink: `css/prism.css`,
      // rawFilepath,
      // rawCss: await fs.readFileSync(rawFilepath)
    };
  }

  render() {
    return minCss(getContents("css/prism-theme.css", "css/code.css"));
  }
};
