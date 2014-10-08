<?php
/**
 * @file
 * Template file to style output.
 */
?>
<?php if (isset($viewer)): ?>
  <div id="book-viewer">
    <?php print $viewer; ?>
  </div>
<?php endif; ?>
<a class="dwn_btn" href="<?php print url("islandora/object/{$object}/datastream/PDF/download"); ?>">Download</a>
<div class="islandora-book-metadata">
  <?php print $description; ?>
  <?php if ($parent_collections): ?>
    <div>
      <h2><?php print t('In collections'); ?></h2>
      <ul>
        <?php foreach ($parent_collections as $collection): ?>
          <li><?php print l($collection->label, "islandora/object/{$collection->id}"); ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
  <?php endif; ?>
  <?php print $metadata; ?>
</div>
