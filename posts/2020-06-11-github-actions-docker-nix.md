---
title: GitHub actions with Docker and Nix
mySlug: github-actions-docker-nix
tags:
  - github
  - automation
  - docker
  - nix
---

I created my first GitHub action:
[clojars publish action](https://github.com/jlesquembre/clojars-publish-action).
For it, I created a Docker image. At first, I went to Docker hub and looked for
the clojure images, but I realized that I also needed to install maven. There is
also a Maven image, but since I need maven **and** clojure on the container, the
only option was to create my own image based on the official ones and install
the other dependency manually.

Then, I remembered about an interesting project I hear about, [Nixery][]. With
it, you can create Docker images based on [NixOS][], and it makes really easy to
install dependecies. In my case, I just needed this:

```dockerfile
FROM nixery.dev/shell/maven/clojure
```

Done, you alredy have a container with some basic linux utilities, maven and
clojure. If you need to install something else, just add `/other-dep`.

Since I'm already a [NixOS][] user, it is a really good solution for me. It
gives me an easy way to install dependecies, on the linux distribution I know
the best.

[nixos]: https://nixos.org/
[nixery]: https://nixery.dev/
