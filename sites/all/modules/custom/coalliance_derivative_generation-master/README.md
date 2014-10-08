coalliance_derivative_generation
==========================

migrating from Islandora 6 to Islandora 7


A drush script to create derivatives for an object ingested from a FoxML record exported from Islandora 6 into Islandora 7.

Dependencies
------------
The Islandora module and the solution pack for the Fedora Object

Installation
------------
Clone this module into your modules folder.  Then enable using either Drupal's admin interface or Drush.

* $ cd /var/www/html/drupal7/sites/YourSiteHere/modules
* $ git clone https://github.com/edf/coalliance_derivative_generation.git
* $ drush en coalliance_derivative_generation

Logging
-------
use "drush ws --tail --full" to tail the watchdog logs

Usage
----

drush -u 1 --root=/var/www/drupal7 -l http://yourFQDN coalliance_generate_derivatives yournamespace:pid#

drush -u 1 --root=/var/www/drupal7 -l http://yourFQDN coalliance_generate_techmd yournamespace:pid#
