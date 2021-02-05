---
title: Automate software releases
mySlug: automate-software-releases
tags:
  - releases
  - automation
---

I authored projects in different languages, and one pain point was always make a new releases.
The process is always similar:

- Update changelog
- Update version number
- Create a new git tag
- Create a github release
- Create package and upload to software repository (npm, clojars, ...)
- Update version number to the next development version

What makes it difficult is that every language has different tools to manage
that steps. That tools also make different assumptions, making some steps in
different order, or have different expectations. For example, some tools make a
git tag automatically for you, while others expect that you make the tag
manually and then the release is automatically trigger.

To make it even more complex, some steps are not necessary for some languages.
For example, for golang there is no repository (like npm), the only source of
true is the git repository.

But at the end, making releases should be an easy task, and in a perfect world
identical no matter your programming language.
I will explain my approch to make it as consistent as possible between
different languages while leveraging existing tools.

## Keeping a changelog

I follow [Keep a Changelog](https://keepachangelog.com/) conventions and
maintain the changelog manually. I tried some tools to generate
changelogs, but they are not realeible. Changelogs are difficult to parse.
And probably you don't want all your commit messages to end in
the changelog, which is the case for many changelog generators. I think is
better to manually update it after you do a non trivial change.
It requires a bit of discipline, but it pays off.

TODO
you can use:
https://github.com/mindsers/changelog-reader-action
to cut github releases

## Plumbing changes

By plumbing changes I mean all the repetive changes that need to be done to
perform the release, like update the version number, create a tag, and so on.
There must be something to trigger that changes. Ideally, would be a new git tag, but unfortunately is not always possible. Let's see one an example for a golang release:

TODO

java example

## Notes

In my opinion, the way we distribute packages would be better if:

- Every language manage dependecies on top of git. No more specific repositories like npm, pypi or maven, just git.

- Every language manage dependecies on top of git. Software repositories like
  npm, pypi or maven, are solving the same problems already solved by git. Just use git.

- In case you want to distribute some resources as part of your project, even if
  they are generated as part of your build, add them to git.
  This allows you to distribute your package just with git, and avoids to your user to have to run an extra build step.
  One example of it is pathom-pedestal, the html, js and css files are
  generated during the build step, but since the consumer is a clojure user,
  they should not care about the frontend part.
  An example of one exception for this is lit-element.

