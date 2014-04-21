.. title: Autofs configuration
.. slug: autofs-configuration
.. date: 2011-03-11
.. tags: linux, autofs
.. type: text

Autofs uses `/etc/autofs/auto.master` as its default primary configuration
file. We can define two kind of maps in this file, direct and indirect. An
example:

.. code-block:: text

    # mount point   config file        options
    /-              /etc/autofs/auto.direct   --ghost
    /media/cifs     /etc/autofs/auto.cifs     --timeout=60 --ghost
    /media/sshfs    /etc/autofs/auto.sshfs    --timeout=60 --ghost
    +auto.master

.. TEASER_END:


First map is a direct map, the other two are indirect. Entries in a direct map
contain an absolute path, instead of the relative path names used in indirect
maps. The `--ghost` option tells the automounter to create empty directories of
all the mount points. The `/media` folder should be empty.  Let's see the other
configuration files, in this example we are going to mount a remote file system
using cifs and ssh.

`/etc/autofs/auto.direct`

.. code-block:: text

    # directory          mount options                      device to mount
    /home/ian/music      -fstype=cifs,ro,soft,user=guest    ://192.168.1.10/music
    /home/deb/music      -fstype=cifs,ro,soft,user=guest    ://192.168.1.10/music

Folders `/home/ian/music` and `/home/deb/music` should be empty or not exist. In
both we can access to te remote folder /music in computer 192.168.1.10

`/etc/autofs/auto.cifs`

.. code-block:: text

    # directory      mount options                        device to mount
    ian              -fstype=cifs,ro,soft,user=ian        ://192.168.1.10/export/home/ian
    deb              -fstype=cifs,ro,soft,user=deb        ://192.168.1.10/export/home/deb

Folders `/media/cifs/ian` and `/media/cifs/deb` will be created.


`/etc/autofs/auto.sshfs`

.. code-block:: text

    # directory     mount options                                               device to mount
    ian_ssh         -fstype=fuse,rw,allow_other,IdentityFile=/path/to/ssh_key   :sshfs\#user@192.168.1.10\:/mnt/folder/

Folder `/media/sshfs/ain_ssh` will be created.
