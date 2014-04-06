.. title: Arch Linux, quick installation guide
.. slug: arch-linux-quick-installation-guide
.. date: 2014/03/28 13:02:27
.. tags: archlinux
.. type: text


iPXE
====

Install from a USB using `iPXE <http://ipxe.org/>`_.

Download image from http://boot.ipxe.org/ipxe.iso and copy to an USB stick.


.. TEASER_END:


Find your USB

.. code-block:: text

    lsblk

Copy the image to the USB

.. code-block:: text

    sudo dd if=ipxe.iso of=/dev/sdX


Now boot with the USB


Arch Linux Netboot
==================

Obtain an IP address


.. code-block:: text

    dhcp


Start Arch Linux boot, original link is http://releng.archlinux.org/pxeboot/arch.ipxe

.. code-block:: text

    chain http://bit.do/archipxe


Get `Arch Linux Ultimate Install Script <https://github.com/helmuthdu/aui>`_

.. code-block:: text

    wget http://bit.do/archis
    tar xzf archis
    cd <dir> && ./ais

Reboot and finish the installation. If network doesn't work do

.. code-block:: text

    systemctl start dhcpcd


Helper to finish the installation, original at
https://raw.githubusercontent.com/jlesquembre/arch_install_script/master/ais.sh

.. code-block:: text

    wget http://bit.do/jlais
