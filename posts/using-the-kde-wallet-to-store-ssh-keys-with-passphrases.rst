.. title: Using the KDE Wallet to store ssh keys with passphrases
.. slug: using-the-kde-wallet-to-store-ssh-keys-with-passphrases
.. date: 2012/03/09 11:49:46
.. tags: openssh, linux, kde
.. link: using-the-kde-wallet-to-store-ssh-keys-with-passphrases
.. type: text

I have read an article about SSH passphrases
(`github:help <http://help.github.com/ssh-key-passphrases/>`_), but they only
explain how to use ssh-agent with msysgit and Mac OSX, no word about Linux.

This guide is about how to use KDE Wallet with ssh-agent. This way, we can use
SSH keys with passphrases, but we don't need to enter a passphrase every time
we use the key, KDE Wallet does the job. I assume you are using KDE.


.. TEASER_END:

In 3 easy steps:

1. Install ksshaskpass
----------------------

Use your favorite package manager.


2. Create script file
---------------------

Create the file

.. code-block:: bash

    ~/.kde/Autostart/ssh-add.sh

On some distributions `~/.kde4/Autostart/ssh-add.sh`

And add this content


.. code-block:: bash

    #!/bin/sh
    export SSH_ASKPASS=/usr/bin/ksshaskpass
    ssh-add < /dev/null


3. Make it executable
---------------------


.. code-block:: bash

    chmod +x ~/.kde/Autostart/ssh-add.sh


And run the script (or restart the session)

Extra
-----

For security reasons, is a good idea stop ssh-agent when you finish your
session, create the file

.. code-block:: bash

    ~/.kde/shutdown/ssh-agent.sh

With this content

.. code-block:: bash

    #!/bin/sh
    ssh-agent -k

This file should be executable


A good page for more info about SSH: `Secure Shell (Arch Linux)
<https://wiki.archlinux.org/index.php/Secure_Shell>`_
