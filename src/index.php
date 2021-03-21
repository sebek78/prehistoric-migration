<?php
  $action = $_SERVER['REQUEST_URI'];
  $action = trim($action, '/');
?>
<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Prehistoryczna migracja</title>
  <base href="/test/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="/test/assets/favicon-p.png">
  <link href="https://fonts.googleapis.com/css2?family=Underdog&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Nunito&amp;display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/test/styles.css"></head>
<body data-path="<?php echo $action ?>">
  <app-root></app-root>
<script src="/test/runtime.js" defer></script><script src="/test/polyfills.js" defer></script><script src="/test/vendor.js" defer></script><script src="/test/main.js" defer></script></body>
</html>
