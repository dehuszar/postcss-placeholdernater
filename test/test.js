/* jshint node: true */
'use strict';

import test from 'tape';
import postcss from 'postcss';
import extend from 'postcss-extend';
import placeholdernater from '../../index.js';
import {name} from '../../package.json';

let tests = [{
  message: 'should replace class designation to sass placeholder, other selectors should be unaffected',
  fixture: 'article { display: block; font-size: 1.2em; } .supplementary { float: right; width: 25%; } #application { display: block; margin: 0; padding: 0; text-align: center; width: 100%; }',
  expected: 'article { display: block; font-size: 1.2em; } %supplementary { float: right; width: 25%; } #application { display: block; margin: 0; padding: 0; text-align: center; width: 100%; }'
}, {
  options: {type: "scss"},
  message: 'should replace class designation to sass placeholder, other selectors should be unaffected',
  fixture: 'article { display: block; font-size: 1.2em; } .supplementary { float: right; width: 25%; } #application { display: block; margin: 0; padding: 0; text-align: center; width: 100%; }',
  expected: 'article { display: block; font-size: 1.2em; } %supplementary { float: right; width: 25%; } #application { display: block; margin: 0; padding: 0; text-align: center; width: 100%; }'
}, {
  options: {type: "styl"},
  message: "should replace class designation to stylus placeholder, other selectors should be unaffected",
  fixture: 'article { display: block; font-size: 1.2em; } .supplementary { float: right; width: 25%; } #application { display: block; margin: 0; padding: 0; text-align: center; width: 100%; }',
  expected: 'article { display: block; font-size: 1.2em; } $supplementary { float: right; width: 25%; } #application { display: block; margin: 0; padding: 0; text-align: center; width: 100%; }'
}];

function process (css, options) {
  return postcss().use(extend()).use(placeholdernater(options)).process(css).css;
}

test(name, t => {
  t.plan(tests.length);

  tests.forEach(test => {
    let options = test.options || { type: "sass" };
    t.equal(process(test.fixture, options), test.expected, test.message);
  });
});

test('should use the postcss plugin api', t => {
  t.plan(2);
  t.ok(placeholdernater().postcssVersion, 'should be able to access version');
  t.equal(placeholdernater().postcssPlugin, name, 'should be able to access name');
});
