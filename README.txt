This folder contains the source used to generate a static site by nikola.

Installation and documentation at http://getnikola.com

Configuration file for the site is `conf.py`.

To build the site::

    nikola build

To see it::

    nikola serve

And point your browser to http://localhost:8000


To check all available commands::

    nikola help

Dependencies::

    compass
    npm


Install compass::

    gem install compass scut bourbon
    gem install --pre sass-css-importer


Install node dependencies::

    cd themes/lafuente
    npm install
