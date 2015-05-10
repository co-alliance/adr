<?php

function islandora_marcxml_settings($form, &$form_state) {
  $form['islandora_marcxml_mods_to_marc_xsl_path'] = array(
    '#type' => 'textfield',
    '#title' => t('MODS to MARCXML XSL Path'),
    '#description' => t('Please enter the xsl file path to convert from MODS to MARCXML'),
    '#default_value' => variable_get('islandora_marcxml_mods_to_marc_xsl_path', drupal_get_path('module', 'islandora_marcxml') . '/xsl/MODS2MARC21slim.xsl'),
    '#required' => TRUE,
  );

  $form['islandora_marcxml_marc_to_html_xsl_path'] = array(
    '#type' => 'textfield',
    '#title' => t('MARCXML to HTML XSL Path'),
    '#description' => t('Please enter the xsl file path to convert from MODS to MARCXML'),
    '#default_value' => variable_get('islandora_marcxml_marc_to_html_xsl_path', drupal_get_path('module', 'islandora_marcxml') . '/xsl/MARC21slim2HTML.xsl'),
    '#required' => TRUE,
  );

  $form['islandora_marcxml_marc_to_mods_xsl_path'] = array(
    '#type' => 'textfield',
    '#title' => t('MARCXML to MODS XSL Path'),
    '#description' => t('Please enter the xsl file path to convert from MARCXML to MODS'),
    '#default_value' => variable_get('islandora_marcxml_marc_to_mods_xsl_path', drupal_get_path('module', 'islandora_marcxml') . '/xsl/MARC21slim2MODS3-5.xsl'),
    '#required' => TRUE,
  );

  return system_settings_form($form);
}
