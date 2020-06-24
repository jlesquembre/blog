---
title: Running a local dns and web server
tags:
  - nix
  - dns
  - webserver
---

As a software developer, I run multiple web services to be accessed only from
localhost. While it is possible to access them on `http://localhost`, I prefer
to have more descriptive urls, like `http://docs.local`.

I'm going to describe my [NixOS][] setup to resolve `.local` domains to
localhost and access my local web server. I'm using [CoreDNS][] and [Caddy][] to
accomplish it. Keep in mind that while I'm showing nix configuration snippets,
you could extract the configuration files and run a similar setup in any Linux
distribution.

It is interesting to notice that [CoreDNS][] started its life as a fork of
[Caddy][].

# DNS server

While I could use [dnsmasq][], I wanted to try a newer DNS server, [CoreDNS][].
Let's start the service with some custom configuration:

{% raw %}

```nix
services.coredns.enable = true;
services.coredns.config =
  ''
    . {
      # Cloudflare and Google
      forward . 1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4
      cache
    }

    local {
      template IN A  {
          answer "{{ .Name }} 0 IN A 127.0.0.1"
      }
    }
  '';
```

{% endraw %}

The first block will forward all the DNS requests to Cloudflare and Google DNS
servers, and the results will be cached (1 hour by default)

The second block returns an A record with value `127.0.0.1` for any request for
a `.local` domain.

So far, so good, we have a local DNS server up and running. Now we need to
configure our network manager to use that DNS server. If you are on [NixOS][],
that's pretty easy:

```nix
networking.networkmanager.insertNameservers = [ "127.0.0.1" ];
```

# Web server

I could use [nginx][], but I decided to use [Caddy][] instead because it comes
with an HTTP API out of the box. I'm not explaining it in this post, but
[Caddy][]'s API opens the door to many interesting possibilities.

Let's take a look our `Caddyfile` configuration:

```
http://docs.local {
  root * /path/to/dir
  file_server
}
```

Here we are saying that all requests to `http://docs.local` should serve static
files located at `/path/to/dir`.

Until [#86686](https://github.com/NixOS/nixpkgs/pull/86686) is merged, you need
to create your own systemd unit to start [Caddy][]:

```nix
let
  caddyConfig = pkgs.writeText "Caddyfile"
    ''
      http://docs.local {
        root * /path/to/dir
        file_server
      }
    '';
in
{
  systemd.services.caddy = {
    description = "Caddy web server";
    after = [ "network-online.target" ];
    wants = [ "network-online.target" ];
    wantedBy = [ "multi-user.target" ];
    serviceConfig = {
      User = "caddy";
      Group = "caddy";
      ExecStart = ''
        ${pkgs.caddy2}/bin/caddy run --config ${caddyConfig} --adapter caddyfile
      '';
      ExecReload = ''
        ${pkgs.caddy2}/bin/caddy reload --config ${caddyConfig} --adapter caddyfile
      '';
      TimeoutStopSec = "5s";
      LimitNOFILE = 1048576;
      LimitNPROC = 512;
      PrivateTmp = true;
      ProtectSystem = "full";
      AmbientCapabilities = "cap_net_bind_service";
    };
  };

  users.users.caddy = {
    group = "caddy";
    uid = config.ids.uids.caddy;
    home = caddyDir;
    createHome = true;
    extraGroups = [ "users" ];
  };

  users.groups.caddy.gid = config.ids.uids.caddy;
}
```

[nixos]: https://nixos.org/
[caddy]: https://caddyserver.com/
[coredns]: https://coredns.io/
[dnsmasq]: http://www.thekelleys.org.uk/dnsmasq/doc.html
[nginx]: https://nginx.org/en/docs/
