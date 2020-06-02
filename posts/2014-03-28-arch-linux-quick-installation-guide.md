---
title: Arch Linux, quick installation guide
mySlug: arch-linux-quick-installation-guide
tags:
  - archlinux
---

## iPXE

Install from a USB using [iPXE](http://ipxe.org/).

Download image from http://boot.ipxe.org/ipxe.iso and copy to an USB stick.

Find your USB

```bash
lsblk
```

Copy the image to the USB

```bash
sudo dd if=ipxe.iso of=/dev/sdX
```

Now boot with the USB

## Arch Linux Netboot

Obtain an IP address

```bash
dhcp
```

Start Arch Linux boot, original link is http://releng.archlinux.org/pxeboot/arch.ipxe

```bash
chain http://bit.do/archipxe
```

Get [Arch Linux Ultimate Install Script](https://github.com/helmuthdu/aui)

```bash
wget http://bit.do/archis
tar xzf archis
cd <dir> && ./ais
```

Reboot and finish the installation. If network doesn't work do

```bash
systemctl start dhcpcd
```

Helper to finish the installation, original at
https://raw.githubusercontent.com/jlesquembre/arch_install_script/master/ais.sh

```bash
wget http://bit.do/jlais
```
