---
title: Give sudo access to any user
mySlug: give-sudo-access-to-any-user
tags:
  - sudo
  - linux
---

Normally, after install the OS (Debian in my case), you don't have sudo access,
and you can see this error:

```
user is not in the sudoers file. This incident will be reported.
```

To solve it, first log in as root, to do it enter:

```bash
su root
```

Now, as super user, you can run this command:

```bash
visudo
```

With this command we open the sudo configuration file, add at the end this line:

```
user ALL=(ALL) ALL
```

Replace `user` with your user name and save the file. Don't forget exit from the super user account, simply enter:

```bash
exit
```

## Tip:

If you use Debian, and want to change the default text editor for the system, enter this command:

```bash
sudo update-alternatives --config editor
```

A list with all text editor will appear and you can select your favourite.

If you want to know where the sudo incident are reported, [xkcd](http://xkcd.com/) offers you an explanation:

![incident xkcd 838](http://imgs.xkcd.com/comics/incident.png)
