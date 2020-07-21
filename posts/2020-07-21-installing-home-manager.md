---
title: Custom home-manager installation with NixOS
tags:
  - nixos
  - home-manager
---

Recently I hear about
[home-manager-template](https://github.com/ryantm/home-manager-template). The
project rationale resonates with me. In fact, I did something similiar on my
NixOS `configuration.nix`.

Apart of trying to make the [home-manager][] installation more reproducible, my
goals are:

- Install [home-manager][] from my system `configuration.nix`.
- Use [home-manager][] from a git checkout. That makes easier for me to test new
  ideas or patches.
- Don't repeat my self. I don't want to define the same variable at the system
  level and in [home-manager][], e.g.: my username or my hostname.

To accomplish that, I have the following function in my `configuration.nix`:

```nix
let
  user = "john";
  userHome = "/home/${user}";
  hostName = "laptop";

  home-manager = { home-manager-path, config-path }:
    assert builtins.typeOf home-manager-path == "string";
    assert builtins.typeOf config-path == "string";
    (
      pkgs.callPackage
        (/. + home-manager-path + "/home-manager") { path = "${home-manager-path}"; }
    ).overrideAttrs (old: {
      nativeBuildInputs = [ pkgs.makeWrapper ];
      buildCommand =
        let
          home-mananger-bootstrap = pkgs.writeTextFile {
            name = "home-manager-bootstrap.nix";
            text = ''
              { config, pkgs, ... }:
              {
                # Home Manager needs a bit of information about you and the
                # paths it should manage.
                home.username = "${user}";
                home.homeDirectory = "${userHome}";
                home.sessionVariables.HOSTNAME = "${hostName}";
                imports = [ ${config-path} ];
              }
            '';
          }; in
        ''
          ${old.buildCommand}
          wrapProgram $out/bin/home-manager --set HOME_MANAGER_CONFIG "${home-mananger-bootstrap}"
        '';
    });
in
{
  users.users.${user} = {
    home = userHome;
    packages = [
      (home-manager {
        home-manager-path = "${userHome}/home-manager";
        config-path = builtins.toString ../home-manager + "/${hostName}.nix";
      })
    ];
  };
}
```

Let's break that code to understand what is happening.

```nix
let
  user = "john";
  userHome = "/home/${user}";
  hostName = "laptop";
```

First I define some variables I'll use later. It is possible to define a
function where you pass them as arguments, but for now I'm just using a let
block.

---

```nix
  home-manager = { home-manager-path, config-path }:
    assert builtins.typeOf home-manager-path == "string";
    assert builtins.typeOf config-path == "string";
```

Now I define a function responsible for installing [home-manager][] . It takes 2
arguments, `home-manager-path` (path to my local [home-manager][] git checkout)
and `config-path` (path to my main [home-manager][] configuration file, usually
called `home.nix`). I'm also type-checking the arguments.

---

```nix
    (
      pkgs.callPackage
        (/. + home-manager-path + "/home-manager") { path = "${home-manager-path}"; }
    ).overrideAttrs (old: {
```

I'm calling the derivation provided by [home-manager][], it is defined here:

https://github.com/rycee/home-manager/blob/master/home-manager/default.nix

Notice that it takes one argument, `path`, the path to my local [home-manager][]
checkout. Since I need further customization, I use the `overrideAttrs` function
to produce a new derivation based on the original one.

---

```nix
      nativeBuildInputs = [ pkgs.makeWrapper ];
      buildCommand =
        let
          home-mananger-bootstrap = pkgs.writeTextFile {
           # ...
          }; in
        ''
          ${old.buildCommand}
          wrapProgram $out/bin/home-manager --set HOME_MANAGER_CONFIG "${home-mananger-bootstrap}"
        '';
```

These are the arguments for `overrideAttrs`. Since I want to wrap
[home-manager][], I need `pkgs.makeWrapper`.

I'm extending the build command. I'm calling the original [home-manager][] build
command, and then wrapping it to set the environment variable
`HOME_MANAGER_CONFIG` to a file that I'm generating with the `writeTextFile`
helper function. More details on that later. Notice that `HOME_MANAGER_CONFIG`
is the entrypoint for [home-manager][], usually that file is `home.nix`.

---

```nix
          home-mananger-bootstrap = pkgs.writeTextFile {
            name = "home-manager-bootstrap.nix";
            text = ''
              { config, pkgs, ... }:
              {
                # Home Manager needs a bit of information about you and the
                # paths it should manage.
                home.username = "${user}";
                home.homeDirectory = "${userHome}";
                home.sessionVariables.HOSTNAME = "${hostName}";
                imports = [ ${config-path} ];
              }
            '';
```

This is how I'm generating the main the entrypoint file for [home-manager][].
It's a `.nix` file itself, which is added to the nix store. When I generate my
NixOS configuration, with `nixos-rebuild build`, I know the value for some of
the variables needed by [home-manager][], like my username or the hostname. I'm
taking advange of that to generate a minimal `home.nix` file, where the values
for that variables are injected, and then I'm importing my real [home-manager][]
configuration (defined by the `config-path` variable)

[home-manager]: https://rycee.gitlab.io/home-manager/

---

```nix
in
{
  users.users.${user} = {
    home = userHome;
    packages = [
      (home-manager {
        home-manager-path = "${userHome}/home-manager";
        config-path = builtins.toString ../home-manager + "/${hostName}.nix";
      })
    ];
  };
}
```

The last step, this is how I install [home-manager][] from my NixOS
`configuration.nix`. I'm just adding the package returned by my `home-manager`
function. The 2 arguments to the functions are the path to my local
[home-manager][] checkout and the path to my `home.nix` file.
