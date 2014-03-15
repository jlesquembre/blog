.. title: Autofs configuration
.. slug: autofs-configuration
.. date: 2011-03-11
.. tags: linux, autofs
.. type: text

Autofs uses `/etc/auto.master` as its default primary configuration file. We
can define two kind of maps in this file, direct and indirect. An example:

.. code-block:: text

    # mount point   config file        options
    /-              /etc/auto.direct   --ghost
    /misc           /etc/auto.misc     --timeout=30 --ghost
    +auto.master

.. TEASER_END:


First map is a direct map, second is indirect. Entries in a direct map contain
an absolute path, instead of the relative path names used in indirect maps. The
`--ghost` option tells the automounter to create empty directories of all the
mount points. The `/misc` folder should be empty.
Let's see the other configuration files, in this example we are going to mount
remote file systems using cifs.

`/etc/auto.direct`

.. code-block:: text

    # directory          mount options                      device to mount
    /home/ian/music      -fstype=cifs,ro,soft,user=guest    ://192.168.1.10/music
    /home/deb/music      -fstype=cifs,ro,soft,user=guest    ://192.168.1.10/music

Folders `/home/ian/music` and `/home/deb/music` should be empty or not exist. In
both we can access to te remote folder /music in computer 192.168.1.10

`/etc/auto.misc`

.. code-block:: text

    # directory  mount options                        device to mount
    ian          -fstype=cifs,ro,soft,user=ian        ://192.168.1.10/export/home/ian
    deb          -fstype=cifs,ro,soft,user=deb        ://192.168.1.10/export/home/deb

Folders `/misc/ian` and `/misc/deb` will be created.
