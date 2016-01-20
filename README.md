# postcss-placeholdernater
This PostCSS plugin will take all CSS passed into it and convert all classes into placeholder selectors

  The goal is to allow the ingestion of large CSS frameworks like (Bootstrap, Foundation, Pure, etc.) and pattern libraries into memory, outputting only the classes you explicitly @extend.  Classes can also be remapped away from presentationally descriptive names to something more semantic class names.  More info on Semantic Remapping [here](https://medium.com/@dehuszar/semantic-remapping-with-css-pre-processors-906ba1a9910c#.ssybi2c9e).
  
  By default, the plugin will output [Sass placeholder selectors](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_) (i.e. `%selector-name`), but passing the option `{type: "styl"}` will output [Stylus's placeholder syntax](http://stylus-lang.com/docs/extend.html#extending-placeholder-selectors) (i.e. `$selector-name`).
  
  Usage:
  
  ```
  // dependencies
  var fs = require("fs");
  var postcss = require("postcss");
  var extend = require("postcss-extend");
  var placeholdernater = require("postcss-placeholdernater");
  
  var file = "/path/to/pure.css";
  
  // css to be processed
  var css = fs.readFileSync("src/" + file, "utf8");
  
  // process css
  postcss()
    .use(atImport())
    .use(nested())
    .use(reference())
    .use(extend())
    .use(placeholdernater()) // .use(placeholdernater({type: 'styl'})) for stylus syntax output
    .process(css, {
        from: "src/" + file,
        to: file
    }).then(function (result) {
        fs.writeFileSync(file, result.css);
        if ( result.map ) fs.writeFileSync(file + '.map', result.map);
    });
  ```
