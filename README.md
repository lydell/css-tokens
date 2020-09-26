Deprecated
==========

Use [@csstools/tokenizer](https://github.com/csstools/tokenizer) instead.

Overview [![Build Status](https://travis-ci.org/lydell/css-tokens.svg?branch=master)](https://travis-ci.org/lydell/css-tokens)
========

A regex that tokenizes CSS.

```js
var cssTokens = require("css-tokens").default

var cssString = ".foo{prop: foo;}\n..."

cssString.match(cssTokens)
// [".foo", "{", "prop", ":", " ", "foo", ";", "}", "\n", ...]
```


Installation
============

- `npm install css-tokens`

```js
import cssTokens from "css-tokens"
// or:
var cssTokens = require("css-tokens").default
```


Usage
=====

### `cssTokens` ###

A regex with the `g` flag that matches CSS tokens.

The regex _always_ matches, even invalid CSS and the empty string.

The next match is always directly after the previous.

### `var token = matchToToken(match)` ###

```js
import {matchToToken} from "css-tokens"
// or:
var matchToToken = require("css-tokens").matchToToken
```

Takes a `match` returned by `cssTokens.exec(string)`, and returns a `{type:
String, value: String}` object. The following types are available:

- string
- comment
- number
- unquotedUrl
- name
- punctuator
- whitespace
- invalid

Comments and strings also have a `closed` property indicating if the token was
closed or not (see below).

Strings come in two flavors. To distinguish them, check if the token starts with
`'` or `"`.

Names may start with `@` (as in at-rule names), `.` (as in class selectors) and
`#` (as in id selectors and hex colors).


Invalid code handling
=====================

Unterminated strings are still matched as strings. CSS strings cannot contain
(unescaped) newlines, so unterminated strings simply end at the end of the
line.

Unterminated multi-line comments are also still matched as comments. They
simply go on to the end of the string.

Unterminated unquoted urls are also still matched as unquoted urls. They
continue as long as there are valid characters.

Invalid ASCII characters have their own capturing group.


Limitations
===========

Tokenizing CSS using regexes—in fact, _one single regex_—won’t be
perfect. But that’s not the point either.

### Quoted vs. unquoted urls ###

The following is hardly a “limitation”, but could be mentioned:

```css
url(http://www.w3.org/2000/svg)
url('http://www.w3.org/2000/svg')
```

The first line is matched as one single token (unquotedUrl), while the second
is matched as four (name + punctuator + string + punctuator). This _could_ be
fixed, but isn’t to simplify the regex.


License
=======

[MIT](LICENSE).
