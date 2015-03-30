<?php

function islandora_marcxml_settings($form, &$form_state) {
  $form['islandora_marcxml_mods_to_marc_xsl_path'] = array(
    '#type' => 'textfield',
    '#title' => t('MODS to MARCXML XSL Path'),
    '#description' => t('Please enter the xsl file path to convert from MODS to MARCXML'),
    '#required' => TRUE,
  );

  $form['islandora_marcxml_marc_to_html_xsl_path'] = array(
    '#type' => 'textfield',
    '#title' => t('MARCXML to HTML XSL Path'),
    '#description' => t('Please enter the xsl file path to convert from MODS to MARCXML'),
    '#required' => TRUE,
  );

  $form['islandora_marcxml_marc_to_mods_xsl_path'] = array(
    '#type' => 'textfield',
    '#title' => t('MODS to MARCXML XSL Path'),
    '#description' => t('Please enter the xsl file path to convert from MODS to MARCXML'),
    '#required' => TRUE,
  );

  return system_settings_form($form);
}