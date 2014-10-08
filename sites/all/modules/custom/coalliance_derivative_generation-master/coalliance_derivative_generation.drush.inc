<?php

/**
 * @file
 * A drush script for generating derivatives.
 */

/**
 * Implements hook_drush_command().
 */
function coalliance_derivative_generation_drush_command() {
  $items = array();
  $items['coalliance_generate_derivatives'] = array(
    'callback' => 'coalliance_derivative_generation_generate_derivatives',
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

  return $items;
}

/**
 * Use Islandodra batch to generate derivatives.
 */
function coalliance_derivative_generation_generate_derivatives($pid) {
  $object = islandora_object_load($pid);
  module_load_include('inc', 'islandora', 'includes/regenerate_derivatives.form');
  $batch = islandora_regenerate_object_derivatives_batch($object);
  $batch['finished'] = 'coalliance_derivative_generation_generate_derivatives_batch_finished';
  batch_set($batch);
  $batch =& batch_get();
  $batch['progressive'] = FALSE;
  drush_print('Generating derivatives for PID: ' . $pid);
  drush_backend_batch_process();
}

/**
 * Finished function for derivative batch regeneration.
 *
 * @param array $success
 *   An array of success passed from the batch.
 * @param array $results
 *   An array of results passed from the batch.
 * @param array $operations
 *   An array of operations passed from the batch.
 */
function coalliance_derivative_generation_generate_derivatives_batch_finished($success, $results, $operations) {
  foreach ($results['logging'] as $result) {
    foreach ($result['messages'] as $message) {
      drush_print(t($message['message'], $message['message_sub']));
    }
  }
  drush_print('Finished generating derivatives. See above for details.');
}
