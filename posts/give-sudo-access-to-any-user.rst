.. title: Give sudo access to any user
.. slug: give-sudo-access-to-any-user
.. date: 2011-01-18
.. tags: sudo, linux
.. type: text

Normally, after install the OS (Debian in my case), you don't have sudo access,
and you can see this error:

.. code-block:: text

    user is not in the sudoers file. This incident will be reported.

.. TEASER_END:

To solve it, first log in as root, to do it enter:

.. code-block:: bash

    su root

Now, as super user, you can run this command:

.. code-block:: bash

    visudo

With this command we open the sudo configuration file, add at the end this line:

.. code-block:: bash

    user ALL=(ALL) ALL

Replace `user` with your user name and save the file.
Don't forget exit from the super user account, simply enter:


.. code-block:: bash

    exit


Tip:
----

If you use Debian, and want to change the default text editor for the system, enter this command:

.. code-block:: bash

    sudo update-alternatives --config editor

A list with all text editor will appear and you can select your favourite.


If you want to know where the sudo incident are reported, `xkcd
<http://xkcd.com/>`_ offers you an explanation:

.. image:: http://imgs.xkcd.com/comics/incident.png
