# postcss-placeholdernater
This PostCSS plugin will take all CSS passed into it and convert all classes into placeholder selectors

  The goal is to allow the ingestion of large CSS frameworks like (Bootstrap, Foundation, Pure, etc.) and pattern libraries into memory, outputting only the classes you explicitly @extend.  Classes can also be remapped away from presentationally descriptive names to something more semantic class names.  More info on Semantic Remapping [here](https://medium.com/@dehuszar/semantic-remapping-with-css-pre-processors-906ba1a9910c#.ssybi2c9e).

  By default, the plugin will output [Sass placeholder selectors](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_) (i.e. `%selector-name`), but passing the option `{type: "styl"}` will output [Stylus's placeholder syntax](http://stylus-lang.com/docs/extend.html#extending-placeholder-selectors) (i.e. `$selector-name`).

  A mechanism for extending placeholder selectors is required for this plugin to work.  I recommend using [postcss-extend](https://github.com/travco/postcss-extend) as it's a little more robust than it's alternatives and doesn't require the @define-placeholder statement, allowing the simple string replacement of the class `.` for the placeholder `%`.

  ```css
    /* Input example */
    article {
      display: block;
      font-size: 1.2em;
    }

    .supplementary {
      float: right;
      width: 25%;
    }
  ```

  ```css
    /* Output example */
    article {
      display: block;
      font-size: 1.2em;
    }

    %supplementary {
      float: right;
      width: 25%;
    }
  ```

  Usage:

  ```
  postcss(require("postcss-placeholdernater")) // use postcss(require("postcss-placeholdernater")({type: 'styl'})) for stylus syntax output
  ```
