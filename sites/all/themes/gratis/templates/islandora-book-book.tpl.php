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
<style>a.dwn_btn {float:right;background-color:#62B2CE;color:#FFF;letter-spacing:1px;padding:0.5em 1em;text-align:center;margin:1.5em 0;display:block;width:7em}a.dwn_btn:hover {background-color:#5499B1;color:#FFF}</style>
<a class="dwn_btn" href="<?php print url("islandora/object/{$object}/datastream/PDF/download"); ?>">Download Book</a>
<div class="clearfix"></div>
<!-- @todo Add table of metadata values -->