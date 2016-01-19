/* jshint node: true */
"use strict";
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-placeholdernater', function (options) {
  options = options || {
    type: "sass"
  };

  let token = null;

  // determine token from type
  switch(options.type) {
    case "sass":
    case "scss":
      token = "%";
      break;
    case "styl":
      token = "$";
      break;
  }

  let placeholdernate = function placeholdernate(rule) {
    let selector = rule.selector;

    rule.selector = selector.replace(/\./g, token);
  };

  return function (css, result) {
    // Processing code will be added here
    css.walkRules(function(rule) {
      placeholdernate(rule);
    });
  };
});
