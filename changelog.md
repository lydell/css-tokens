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
