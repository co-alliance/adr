<?php

/**
 * @file
 * A drush script for generating derivatives 
 *
 */

/**
 * Implements hook_drush_command().
 */
function coalliance_derivative_generation_drush_command() {
 $items = array();
 $items['coalliance_generate_techmd'] = array(
    'callback' => 'coalliance_derivative_fits',
    'description' => 'generates derivative',
    'arguments' => array(
      'fedora_pid' => "The Fedora PID to process",
    ),
    'options' => array(),
    'examples' => array(
      'simple example' => 'drush -u 1 --root=/var/www/drupal7 -l http://codearl7.coalliance.org coalliance_generate_techmd adrtest:1',
    ),
    'bootstrap' => DRUSH_BOOTSTRAP_DRUPAL_LOGIN,
  );
 $items['coalliance_generate_derivatives'] = array(
    'callback' => 'coalliance_derivatives_generation',
    'description' => 'generates derivatives',
    'arguments' => array(
      'fedora_pid' => "The Fedora PID to process",
    ),
    'options' => array(),
    'examples' => array(
      'simple example' => 'drush -u 1 --root=/var/www/drupal7 -l http://codearl7.coalliance.org coalliance_generate_derivatives adrtest:1',
    ),
    'bootstrap' => DRUSH_BOOTSTRAP_DRUPAL_LOGIN,
  );
 $items['coalliance_generate_derivatives_test'] = array(
    'callback' => 'coalliance_derivatives_generation_test',
    'description' => 'generates derivatives without needed to know content model',
    'arguments' => array(
      'fedora_pid' => "The Fedora PID to process",
    ),
    'options' => array(),
    'examples' => array(
      'simple example' => 'drush -u 1 --root=/var/www/drupal7 -l http://codearl7.coalliance.org coalliance_generate_derivatives_test adrtest:1',
    ),
    'bootstrap' => DRUSH_BOOTSTRAP_DRUPAL_LOGIN,
  );

  return $items;
}
/**
 * derivative generation without specifying the content model
 *
 *
 */
function coalliance_derivative_fits($pid) {

$object = islandora_object_load($pid);
module_load_include('inc', 'islandora_fits', 'includes/derivatives');

islandora_fits_create_techmd($object);

}

/**
 * derivative generation
 *
 *
/**
 * derivative generation without specifying the content model
 *
 *
 */
function coalliance_derivatives_generation_test($pid) {

$object = islandora_object_load($pid);
module_load_include('inc', 'islandora', 'includes/derivatives');
/*  return array(
    'title' => t('Regenerating all derivatives for @label', array('@label' => $object->label)),
    'operations' => islandora_do_batch_derivatives($object, array('force' => TRUE)),
    'init_message' => t('Preparing to regenerate derivatives...'),
    'progress_message' => t('Time elapsed: @elapsed <br/>Estimated time remaining @estimate.'),
    'error_message' => t('An error has occurred.'),
    'file' => drupal_get_path('module', 'islandora') . '/includes/regenerate_derivatives.form.inc',
    'finished' => 'islandora_regenerate_derivative_batch_finished',
  );
*/
islandora_do_batch_derivatives($object, array('force' => TRUE));
}

/**
 * derivative generation
 *
 *
 */
function coalliance_derivatives_generation($pid) {

$object = islandora_object_load($pid);
$object_content_models = $object->relationships->get('info:fedora/fedora-system:def/model#', 'hasModel');
#print_r($object_content_models);

foreach($object_content_models as $content_model_test){
    #print("-line- $content_model_test["object"]["value"]\n");
    $cModel = $content_model_test["object"]["value"]; #echo "***".$object_content_models[0]["object"]["value"]."***";
    $counter++;
    }
if ($counter > 1) {
    echo "\n  $pid has more than one content model. Counter = ". $counter ."\n\n";
  } elseif ($counter == 1) {

/*  content models to configure or remove from list as not needing additional processing
info:fedora/islandora:bookCModel
info:fedora/islandora:collectionCModel ----> not necessary
info:fedora/islandora:compoundCModel
info:fedora/islandora:newspaperCModel
info:fedora/islandora:newspaperIssueCModel
info:fedora/islandora:newspaperPageCModel
info:fedora/islandora:sp-audioCModel
islandora:sp_document
islandora:sp_videoCModel
*/
      if ($cModel == 'islandora:sp_basic_image') {                                     // example pid == wyu:9307
             echo "\n  $pid is OK to process using the $cModel content model\n\n";
             module_load_include('inc', 'islandora_basic_image', 'includes/derivatives');
             islandora_basic_image_create_thumbnail($object, $force = FALSE);
             islandora_basic_image_create_medium_size($object, $force = FALSE);
      } elseif ($cModel == 'islandora:sp_large_image_cmodel') {
             echo "\n  $pid is OK to process using the $cModel content model\n\n";
             module_load_include('inc', 'islandora_large_image', 'includes/derivatives');
             islandora_large_image_create_jp2_derivative($object, $force = FALSE);
             islandora_large_image_create_tn_derivative($object, $force = FALSE);
             islandora_large_image_create_jpg_derivative($object, $force = FALSE);
      } elseif ($cModel == 'islandora:sp_pdf') {                                     // example pid == adrtest:12
             echo "\n  $pid is OK to process using the $cModel content model\n\n";
             module_load_include('inc', 'islandora_pdf', 'includes/derivatives');
             islandora_pdf_add_tn_derivative($object, $force = FALSE);
             islandora_pdf_add_fulltext_derivative($object, $force = FALSE);
             islandora_pdf_add_preview_derivative($object, $force = FALSE);
      } else {
             echo "\n  Object content model does not match $cModel in $pid\n\n";
      }
  } else {
         echo "Check for the presence of a content model for $pid\n";
  } 
}
