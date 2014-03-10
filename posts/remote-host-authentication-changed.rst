.. title: OpenSSH, remote host identification has changed
.. date: 2011-01-18
.. tags: openssh, linux

Sometimes when I run the ssh command I get this error:

.. code-block:: text

    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
    Someone could be eavesdropping on you right now (man-in-the-middle attack)!
    It is also possible that the RSA host key has just been changed.
    The fingerprint for the RSA key sent by the remote host is
    xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx:xx.
    Please contact your system administrator.
    Add correct host key in /home/user/.ssh/known_hosts to get rid of this message.
    Offending key in /home/user/.ssh/known_hosts:7
    RSA host key for 192.168.1.5 has changed and you have requested strict checking.
    Host key verification failed.


.. TEASER_END:

This usually happens when I change any machine in my network.
The best way to solve this problem is removing all keys belonging to hostname
from known_hosts file. In my case, the remote host is 192.168.1.5, so I run the
command:


.. code-block:: sh

    ssh-keygen -R 192.168.1.5


And now I can access again to the remote host.
