.. title: Using public keys with openSSH
.. slug: using-public-keys-with-openssh
.. date: 2011-01-27
.. tags: linux, openssh
.. type: text


.. image:: /images/sshconnection.png

.. TEASER_END:

Generate the key
----------------
We need to create a public key, we do it in computer A:


.. code-block:: bash

    ssh-keygen -t rsa -b 2048 -f /home/user_name/.ssh/key-name


Press always intro when asked to generate a key without passphrase. This is
less secure, but it can be really useful.  Now we have in our .ssh folder the
keys (key-name and key-name.pub)


Copy public key
---------------

Copy the public key to the remote host you wish to access (in our example from computer A to B) and add it to the file


.. code-block:: bash

    ~/.ssh/authorized_keys

If that file does not exist then you should create it.
Or you can use ssh-copy-id to log into a remote machine and append the indicated identity file to that machine's ~/.ssh/authorized_keys file.


.. code-block:: bash

    ssh-copy-id [-i [identity_file]] [user@]machine


Test it
-------

In computer A run this command:

.. code-block:: bash

    ssh -i key user@computerB_IP

If every thing is fine, you should be able to connect to computer B with this
command.



Laziness is a virtue, using ssh config
--------------------------------------

You can create alias for your ssh connections, this way, you don't need to
remember usernames, IPs, etc...

First, create this file:

.. code-block:: bash

    ~/.ssh/config

with this content:

.. code-block:: bash

    Host alias
    HostName computerB_IP
    User username
    IdentityFile ~/.ssh/path/to/key

Now it is possible connent with this command:


.. code-block:: bash

    ssh alias

Great, isn't it? For a complete connect list for the ssh config file, type


.. code-block:: bash

    man ssh_config
