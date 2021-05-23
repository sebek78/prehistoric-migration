<?php
  $action = $_SERVER['REQUEST_URI'];
  $action = trim($action, '/');
  $action = str_replace("prehistoryczna-migracja", "", $action);
?>
<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Prehistoryczna migracja</title>
  <base href="/prehistoryczna-migracja/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="/assets/favicon-p.png">
  <link href="https://fonts.googleapis.com/css2?family=Underdog&amp;display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Nunito&amp;display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="/prehistoryczna-migracja/styles.css"></head>
<body data-path="<?php echo $action ?>">
  <app-root></app-root>
  <script src="/prehistoryczna-migracja/runtime.js" defer></script>
  <script src="/prehistoryczna-migracja/polyfills.js" defer></script>
  <script src="/prehistoryczna-migracja/vendor.js" defer></script>
  <script src="/prehistoryczna-migracja/main.js" defer></script></body>
</html>
