---
title: Custom Clojure helpers in your REPL
tags:
  - clojure
---

## The problem

Over time, I wrote several Clojure helper functions I use while I'm writing new
code. I want to load those helpers every time I start a Clojure REPL. How can I
make those helpers available in any Clojure project I'm working on? Especially
in 3rd party projects I don't control.

## The solution

Traditionally, Clojure developers put development utilities in a `user.clj`
file, since Clojure automatically loads any `user.clj` found in the classpath.
In recent Clojure versions, Clojure CLI was introduced, and now we can call any
Clojure function from the command line. Knowing that, a better alternative is to
move all our helpers to their own project, and to create an alias in our
`~/.config/clojure/deps.edn` for those utilities.

As an example, let's suppose this is the main file for my helpers project:

```clojure
(ns local-utils)

(defn init
  [{:keys [main]]
  (println "Loading helpers...")
  (load-file main))
```

We can add an alias in our `deps.edn` file:

```clojure
{:aliases
 {:user {:exec-fn local-utils/init
         :extra-deps {me.lafuente/clj-dev-utils {:local/root "$HOME/projects/clj-dev-utils"}}}}}
```

Now, in any project, we can do `clj -X:foo:bar:user :main "path/to/main.clj"`.
In this example, we are just printing a message before loading the main entry
point, but we can do whatever we want.

My personal Clojure helpers are here:
https://github.com/jlesquembre/clj-dev-utils

My `init` function loads some helper utilities, initializes
[portal](https://github.com/djblue/portal), enables
[malli](https://github.com/metosin/malli) instrumentation (if present in the
classpath) and starts a [nREPL](https://nrepl.org/) server. We can also provide
the main function to be loaded.

A library I'm using for my helpers is https://github.com/gfredericks/dot-slash-2
With it, I can create aliases under the `.` namespace. For example, `./sh`
points to `clojure.java.shell/sh`. The `.` namespace is loaded automatically, so
I can evaluate `(./sh "ls")` in any file without an explicit `require`
