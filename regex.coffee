# Copyright 2014 Simon Lydell
# X11 (“MIT”) Licensed. (See LICENSE.)

# <http://www.w3.org/TR/css-syntax-3/#token-diagrams>

string = (delimiter) ->
  ///
    #{delimiter}
    (?:
      [^ #{delimiter} \\ \r \n ]
      |
      \\(?: \r\n | [\s\S] )
    )*
    #{delimiter}?
  ///.source

# <http://mathiasbynens.be/notes/css-escapes>
escape = /// \\(?: [ \d a-f A-F ]{1,6}\s? | . ) ///.source


module.exports = ///
  ( # <whitespace>
    \s+
  )
  |
  ( # <comment>
    /\*
    (?:
      [^*]
      |
      \*(?!/)
    )*
    (?: \*/ )?
  )
  |
  ( # <string>
    #{string "'"}
    |
    #{string '"'}
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
      \# # Can be followed by digits to support hex colors. The spec also allows (several) dashes.
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
  ( # <empty>
    ^$
  )
  |
  ( # <invalid>
    [\s\S] # Catch-all rule for anything not matched by the above.
  )
///g
