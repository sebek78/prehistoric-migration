 cd dist
 mkdir game
 mkdir manual
 cd ../src
 cp index.php ../dist/game
 cp index.php ../dist/manual
 cp index.php ../dist/
 cd ../dist
 rm index.html
 echo postbuild done.
