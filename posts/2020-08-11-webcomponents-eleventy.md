---
title: Web components and eleventy
tags:
  - 11ty
  - webcomponents
modules:
  - "model-viewer.min.js"
---

If you want to have some dynamic content in your [eleventy][] static website, a
good option is to use Web Components, they play very well together.

I'm going to explain how I added a web component to my blog, in this example
I'll use [model-viewer][] component. This is the final result:

<model-viewer src="/models/Astronaut.glb" style="height: 50vh" alt="A 3D model of an astronaut" auto-rotate camera-controls></model-viewer>

> [Astronaut](https://poly.google.com/view/dLHpzNdygsg) by
> [Poly](https://poly.google.com/user/4aEd8rQgKu2), licensed under
> [CC-BY](https://creativecommons.org/licenses/by/2.0/).

First, make sure that you set the `html` option for _markdownIt_ to `true` in
your [eleventy][] config file (usually `.eleventy.js`):

```js
module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");
  let options = {
    html: true,
  };

  eleventyConfig.setLibrary("md", markdownIt(options));
};
```

You also need to tell [eleventy][] to copy the web components to your output
directory. If you installed [model-viewer][] with npm, you can copy it adding
this to your `.eleventy.js` config file:

```js
eleventyConfig.addPassthroughCopy({
  "node_modules/@google/model-viewer/dist/model-viewer.min.js":
    "js-modules/model-viewer.min.js",
});
```

But you also need to import the web components in your web pages. To do that,
I'm taking advantage of [eleventy][]'s
[Front Matter Data](https://www.11ty.dev/docs/data-frontmatter/) and the
[Data Cascade](https://www.11ty.dev/docs/data-cascade/). In the
[front matter](https://www.11ty.dev/docs/data-frontmatter/) I define the
components I want to use, that way I can load different components per page:

```
---
title: Web components and eleventy
tags:
  - 11ty
  - webcomponents
modules:
  - "model-viewer.min.js"
---
```

The `modules` property (you can use another name) is a list with all the files I
want to load in that page. You need to process that property when the template
is rendered. I use [JavaScript](https://www.11ty.dev/docs/languages/javascript/)
for my templates, plus
[lit-html-server](https://github.com/popeindustries/lit-html-server), but you
should be able to adapted the next snippet to any of the
[Template Languages](https://www.11ty.dev/docs/languages/) supported by
[eleventy][]:

```js
const { html, renderToString } = require("@popeindustries/lit-html-server");
module.exports = class BaseTemplate {
  async render(data) {
    return renderToString(
      html`
        ${data.modules.map(
          (file) =>
            html`<script type="module" src="/js-modules/${file}"></script>`
        )}
      `
    );
  }
};
```

You can see the real file here:

And now you can just write the html directly on your markdown files:

```html
<model-viewer
  src="/models/Astronaut.glb"
  alt="A 3D model of an astronaut"
  auto-rotate
  camera-controls
></model-viewer>
```

This makes pretty easy to embedded custom components in your markdown documents,
making it similar to writing [MDX](https://mdxjs.com/).

[eleventy]: https://www.11ty.dev/
[model-viewer]: https://modelviewer.dev/
