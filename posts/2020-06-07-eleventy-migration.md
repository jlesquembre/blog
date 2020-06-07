---
title: Eleventy migration
tags:
  - 11ty
  - lit-html
---

After 6 years from my [last post entry](/posts/gnupg-notes), I'm migrating my
personal blog to [Eleventy][].

I heard good things about it and I wanted to give it a try. So far I'm liking it
a lot, the best part about [Eleventy][] is its flexibility. As an example, I
started writing my templates in [Nunjucks](https://mozilla.github.io/nunjucks/),
but since I didn't like the syntax too much, I decided to write the templates
just with [JavaScript](https://www.11ty.dev/docs/languages/javascript/). It was
an improvement, but I was missing some of the functionality provided by
[lit-html][]. I found a project to render [lit-html][] templates on the server,
[lit-html-server][], and it was incredibly easy to plug it into [Eleventy][] and
start to use [lit-html][] templates on my static site.

Now I write the posts in Markdown, which are rendered with
[markdown-it](https://github.com/markdown-it/markdown-it), and the result is
passed to the templates to render the final html with [lit-html-server][]

I'll also try to write regularly. I liked the idea from
[Lambda Island: Advent of Parens](https://lambdaisland.com/blog/2019-11-25-advent-of-parens),
where the author challenged himself to write a blog post for every day of
December until the 24th. While I'm not writing a new post every day, I like the
idea of writing smaller posts, but more often. Let's see how it goes.

[eleventy]: https://www.11ty.dev/
[lit-html]: https://lit-html.polymer-project.org/
[lit-html-server]: https://github.com/popeindustries/lit-html-server
