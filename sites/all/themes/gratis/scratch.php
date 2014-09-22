


      <?php if (!empty($page['footer_first'])): ?>
  <div class="<?php print $footer_columns; ?> ">
    <?php print render($page['footer_first']); ?>
  </div>
<?php endif; ?>

      <?php if (!empty($page['footer_second'])): ?>
  <div class="<?php print $footer_columns; ?> ">
    <?php print render($page['footer_second']); ?>
  </div>
<?php endif; ?>

      <?php if (!empty($page['footer_third'])): ?>
  <div class="<?php print $footer_columns; ?> ">
    <?php print render($page['footer_third']); ?>
  </div>
<?php endif; ?>