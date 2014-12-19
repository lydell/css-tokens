# Copyright 2014 Simon Lydell
# X11 (“MIT”) Licensed. (See LICENSE.)

# <http://www.w3.org/TR/css-syntax-3/#token-diagrams>

# Don’t worry, you don’t need to know CoffeeScript. It is only used for its
# readable regex syntax. Everything else is done in JavaScript in index.js.

# <http://mathiasbynens.be/notes/css-escapes>
escape = /// \\(?: [ \d a-f A-F ]{1,6}\s? | . ) ///.source

module.exports = ///
  ( # <string>
    ([ ' " ])
    (?:
      (?!\2)[^ \\ \r \n ]
      |
      \\(?: \r\n | [\s\S] )
    )*
    (\2)?
  )
  |
  ( # <comment>
    /\*
    (?:
      [^*]
      |
      \*(?!/)
    )*
    ( \*/ )?
  )
  |
  ( # <number>
    [+-]?
    \d*\.?\d+
    (?: [eE][+-]?\d+ )?
  )
  |
  ( # <unquotedUrl>
    # Quoted urls are matched as <name><punctuation><string><punctuation>.
    url\( (?! \s* [ " ' ] )
    \s*
    (?:
      [^ " ' ( ) \\ \s ]
      |
      #{escape}
    )*
    (?: \s* \) )?
  )
  |
  ( # <name>
    (?:
      [ @ . ]?(?! -?\d )
      |
      \#
    )
    (?! -+ (?![ \w \- \u0080-\uFFFF \\ ]) )
    (?:
      [ \w \- \u0080-\uFFFF ]
      |
      #{escape}
    )+
  )
  |
  ( # <operator>
    [ ~ | ^ $ * ]?=
    |
    [ > ~ + * / ]
    |
    -
  )
  |
  ( # <punctuation>
    [ | [ \] ( ) { } , ; ! % ]
    |
    :{1,2}
  )
  |
  ( # <whitespace>
    \s+
  )
  |
  ( # <invalid>
    ^$ # <empty>
    |
    [\s\S] # Catch-all rule for anything not matched by the above.
  )
///g
