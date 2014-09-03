<?php
/**
 * @file
 * platform_content_types.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function platform_content_types_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: menu-footer-menu.
  $menus['menu-footer-menu'] = array(
    'menu_name' => 'menu-footer-menu',
    'title' => 'Footer Menu',
    'description' => '',
  );
  // Exported menu: menu-header-menu.
  $menus['menu-header-menu'] = array(
    'menu_name' => 'menu-header-menu',
    'title' => 'Header Menu',
    'description' => '
',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('
');
  t('Footer Menu');
  t('Header Menu');


  return $menus;
}
