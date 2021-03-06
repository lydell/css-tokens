### Version 2.0.0 (2017-01-11) ###

This release contains one breaking change, that should [improve performance in
V8][v8-perf]:

> So how can you, as a JavaScript developer, ensure that your RegExps are fast?
> If you are not interested in hooking into RegExp internals, make sure that
> neither the RegExp instance, nor its prototype is modified in order to get the
> best performance:
>
> ```js
> var re = /./g;
> re.exec('');  // Fast path.
> re.new_property = 'slow';
> ```

This module used to export a single regex, with `.matchToToken` bolted
on, just like in the above example. This release changes the exports of
the module to avoid this issue.

Before:

```js
import cssTokens from "css-tokens"
// or:
var cssTokens = require("css-tokens")
var matchToToken = cssTokens.matchToToken
```

After:

```js
import cssTokens, {matchToToken} from "css-tokens"
// or:
var cssTokens = require("css-tokens").default
var matchToToken = require("css-tokens").matchToToken
```

[v8-perf]: http://v8project.blogspot.se/2017/01/speeding-up-v8-regular-expressions.html


### Version 1.0.1 (2015-06-20) ###

- Fixed: Declared an undeclared variable.


### Version 1.0.0 (2015-02-26) ###

- Changed: Merged the 'operator' and 'punctuation' types into 'punctuator', for
  consistency with [js-tokens]. (Backwards-incompatible change.)

[js-tokens]: https://github.com/lydell/js-tokens


### Version 0.4.2 (2015-02-21) ###

- Improved: `cssTokens.matchToToken` performance.


### Version 0.4.1 (2015-01-08) ###

- Fixed: \f is now recognized as a newline.


### Version 0.4.0 (2014-12-19) ###

- Changed: The `cssTokens.names` array has been replaced with the
  `cssTokens.matchToToken` function. The capturing groups of `cssTokens` are no
  longer part of the public API; instead use said function. See this [gist] for
  an example. (Backwards-incompatible change.)
- Changed: The empty string is now considered an “invalid” token, instead an
  “empty” token (its own group). (Backwards-incompatible change.)
- Removed: component support. (Backwards-incompatible change.)

[gist]: https://gist.github.com/lydell/be49dbf80c382c473004


### Version 0.3.0 (2014-06-19) ###

- Added: Support for `--custom-properties`. (Backwards-incompatible change.)
- Fixed: `@-` and `.-` (followed by a non-name character) are now matched as
  invalid + operator, instead of name. Note that `#-` is actually allowed by
  the spec. That used to be matched as a name, but is now matched as invalid +
  operator, too. It doesn’t matter. (Backwards-incompatible change.)


### Version 0.2.0 (2014-03-11) ###

- Names may now start with `@`, `#` and `.`. This makes it easier to work with
  at-rules, ids, classes and hex colors. (Backwards incompatible change.)

  Previously those three characters were matched by themselves as punctuation
  and were followed by names. Now, if any of those characters are on their own
  (not followed by a name), they’re matched as invalid.

  Previously, hex colors were matched as either punctuation + name or
  punctuation + number + name. Now they’re always names. (That might not be
  ideal, but consider that `#f00` is both a valid id and a valid hex color,
  which are impossible to distinguish. Think “names of colors”.)


### Version 0.1.0 (2014-03-09) ###

- Initial release.
