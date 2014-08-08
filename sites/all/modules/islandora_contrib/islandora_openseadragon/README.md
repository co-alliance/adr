BUILD STATUS
------------
Current build status:
[![Build Status](https://travis-ci.org/Islandora/islandora_openseadragon.png?branch=7.x)](https://travis-ci.org/Islandora/islandora_openseadragon)

CI Server:
http://jenkins.discoverygarden.ca

ISLANDORA OPENSEADRAGON
==================

CONTENTS OF THIS FILE
---------------------

 * summary
 * dependencies
 * todo

SUMMARY
-------

A Djatoka TileSource for Seadragon

Based in spirit from the JS component of
https://github.com/ksclarke/freelib-djatoka

Instead of "synthesizing" the info for DZI, we create the path to access
Djatoka directly, and obtain different regions for the tiles.

Reverse proxy config
We make the assumption that we (reverse) proxy Djatoka, to fix the same-origin
issue.

For Apache, with Drupal running on the same box as Apache, a couple lines like:

ProxyPass /adore-djatoka http://localhost:8080/adore-djatoka
ProxyPassReverse /adore-djatoka http://localhost:8080/adore-djatoka

in the Apache config somewhere (either the main apache.conf, httpd.conf, or in
and arbitrarily named *.conf in your Apache's conf.d directory should suffice
to establish the reverse proxy.

In Debian derived systems one will need to create location entries for each
proxy or remove the Deny from All in mod_proxy's conf file.


DEPENDENCIES
------------

* OpenSeadragon
We assume the core OpenSeadragon Javascript is put into sites/all/libraries/openseadragon.
Openseadragon .9.129 is known to work well with Islandora 
download: http://openseadragon.github.io/releases/openseadragon-bin-0.9.129.zip
* There is a conditional dependency on the islandora_paged_content module, but should not require
any additional actions from the user as the solution packs that use the feature requiring the
islandora_paged_content module include it in their depency lists.


TODO
----

High

- clean up preprocess function
- availablity for multiple url's through array (newspapers)
- check for DZI, djatoka as fallback
- check for djatoka availability first.

Medium
* documentation
* remove conditional dependency on islandora_paged_content

Low
