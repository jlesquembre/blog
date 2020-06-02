---
title: Load a kernel module
mySlug: load-a-kernel-module
tags:
  - kernel
  - linux
---

In Linux, to load a kernel module (for example, fuse) run:

```bash
modprobe fuse
```

You can verify that the module is loaded using the following command:

```bash
dmesg | grep -i fuse
```

If you want it to to load a module, add that module to `/etc/modules`, an example file:

```bash
# /etc/modules: kernel modules to load at boot time.
#
# This file contains the names of kernel modules that should be loaded
# at boot time, one per line. Lines beginning with "#" are ignored.
# Parameters can be specified after the module name.

fuse
```

And if you want to cofigure some options for that kernel module do it in the
folder `/etc/modules`, in our example put the options in the file
`/etc/modules/fuse`
