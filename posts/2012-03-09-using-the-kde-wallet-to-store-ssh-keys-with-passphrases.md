---
title: Using the KDE Wallet to store ssh keys with passphrases
mySlug: using-the-kde-wallet-to-store-ssh-keys-with-passphrases
tags:
  - openssh
  - linux
  - kde
---

I have read an article about SSH passphrases
([github:help](http://help.github.com/ssh-key-passphrases/)), but they only
explain how to use ssh-agent with msysgit and Mac OSX, no word about Linux.

This guide is about how to use KDE Wallet with ssh-agent. This way, we can use
SSH keys with passphrases, but we don't need to enter a passphrase every time
we use the key, KDE Wallet does the job. I assume you are using KDE.

In 3 easy steps:

### 1. Install ksshaskpass

Use your favorite package manager.

### 2. Create script file

Create the file

```bash
~/.kde/Autostart/ssh-add.sh
```

On some distributions `~/.kde4/Autostart/ssh-add.sh`

And add this content

```bash
#!/bin/sh
export SSH_ASKPASS=/usr/bin/ksshaskpass
ssh-add < /dev/null
```

### 3. Make it executable

```bash
chmod +x ~/.kde/Autostart/ssh-add.sh
```

And run the script (or restart the session)

### Extra

For security reasons, is a good idea stop ssh-agent when you finish your
session, create the file

```bash
~/.kde/shutdown/ssh-agent.sh
```

With this content

```bash
#!/bin/sh
ssh-agent -k
```

This file should be executable

A good page for more info about SSH: [Secure Shell (Arch Linux)](https://wiki.archlinux.org/index.php/Secure_Shell)
