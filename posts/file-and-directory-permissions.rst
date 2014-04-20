.. title: File and directory permissions
.. slug: file-and-directory-permissions
.. date: 2011-01-24
.. tags: linux
.. type: text


The best way to understand the Linux permissions, is with an example. If we run
the command `ls -l` we get an output like this:

.. code-block:: text

    1 2          3     4     5      6     7             8
    - rw-r-----  1     user  users     8  ene 24 11:01  f.txt
    d rwxr-xr-x  2     root  root   4096  ene 24 12:14  dir

which maps to

.. TEASER_END:



.. code-block:: text

    1 2          3     4     5      6     7             8
    d uuugggooo  links owner group  size  date          name

Numbers from 1 to 8 are not really in the output, but are here to clarify every field.

1. First character specifies the type of the file. In the example above the
   hyphen (`-`) in the first character indicates that this is a normal file, and
   the `d` indicates that this other file is a directory. `List with all file
   types <http://en.wikipedia.org/wiki/Unix_file_types>`_

2. Next 9 characters specifies the files permission. Each 3 characters refers
   to the read, write and execute permissions for user, group and others. In
   this example, `rw-r-----` indicates read-write permission for user, read
   permission for group, and no permission for others.

3. Number of `links <http://en.wikipedia.org/wiki/Hard_link>`_, in this case is
   1 for the file `f.txt` and 2 for the directory `dir`.

4. Owner, in this example, user for the file, and root for the directory.

5. Group, in this example, users for the file, and root for the directory.

6. Size of the file.

7. Last modified time.

8. File name.


Difference in access permission between files and folders are:

+-----------+------------------------------+-----------------------------------+
|           | *File*                       | *Folder*                          |
+===========+==============================+===================================+
| *Read*    | File contents can be read    | Directory listing can be obtained |
+-----------+------------------------------+-----------------------------------+
| *Write*   | File contents can be changed | Directory content can be changed  |
+-----------+------------------------------+-----------------------------------+
| *Execute* | File can be executed         | Directory can be accessed         |
+-----------+------------------------------+-----------------------------------+

Remember, give execute permission to a folder if you want to access it.

Instead of use the values `r`, `w` and `x`, you can use numeric values, where

.. code-block:: text

    r = 4
    w = 2
    x = 1
    - = 0


It is possible combine this values, a table with all the possibilities:

+-------+-----------------+--------------------------------------+
| Value | Text equivalent | Meaning                              |
+=======+=================+======================================+
| 0     | ---             | All types of access are denied       |
+-------+-----------------+--------------------------------------+
| 1     | --x             | Execute access is allowed            |
+-------+-----------------+--------------------------------------+
| 2     | -w-             | Write access is allowed              |
+-------+-----------------+--------------------------------------+
| 3     | -wx             | Write and execute access are allowed |
+-------+-----------------+--------------------------------------+
| 4     | r--             | Read access is allowed               |
+-------+-----------------+--------------------------------------+
| 5     | r-x             | Read and execute access are allowed  |
+-------+-----------------+--------------------------------------+
| 6     | rw-             | Read and write access are allowed    |
+-------+-----------------+--------------------------------------+
| 7     | rwx             | Everything is allowed                |
+-------+-----------------+--------------------------------------+


To change the permissions you can use the command `chmod`, which has this syntax:

.. code-block:: text

    chmod [options] MODE FILE

Let's see some examples, to give read and write access to everyone, you can use this two equivalent commands:


.. code-block:: text

    chmod a=rw file.txt
    chmod 666 file.txt


To give read and write access to user and group, but no access to others, you can use this two equivalent commands:


.. code-block:: text

    chmod u=rw,g=rw,o= file.txt
    chmod 660 file.txt


If you want to change the access permissions of a folder recursively never use
the -R option. Chmod doesn't differentiate between folders and files, and this
is really important, because execution access has different meanings for files
and folders. Instead use this:

For directories:

.. code-block:: bash

    find . -type d -exec chmod 755 {} \;

For files:

.. code-block:: bash

    find . -type f -exec chmod 644 {} \;



To finish, if you want to change the file owner, you can use the command chown,
with this syntax:

.. code-block:: text

    chown [options] OWNER[:GROUP] file.txt

For example:

.. code-block:: bash

    chown user1 file.txt

To change the owner recursively, use the option -R
If you just want to change the group, use the command chgrp.


