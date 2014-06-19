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
