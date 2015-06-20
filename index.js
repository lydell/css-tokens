// Copyright 2014, 2015 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

// This regex comes from regex.coffee, and is inserted here by generate-index.js
// (run `npm run build`).
module.exports = /((['"])(?:(?!\2)[^\\\r\n\f]|\\(?:\r\n|[\s\S]))*(\2)?)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)|(url\((?!\s*["'])\s*(?:[^"'()\\\s]|\\(?:[\da-fA-F]{1,6}\s?|[^\r\n\f]))*(?:\s*\))?)|((?:[@.]?(?!-?\d)|\#)(?!-+(?![\w\-\u0080-\uFFFF\\]))(?:[\w\-\u0080-\uFFFF]|\\(?:[\da-fA-F]{1,6}\s?|[^\r\n\f]))+)|([~|^$*]?=|[>~+*\/]|-|[|[\](){},;!%]|::?)|([ \t\n\r\f]+)|(^$|[\s\S])/g

module.exports.matchToToken = function(match) {
  var token = {type: "invalid", value: match[0]}
       if (match[ 1]) token.type = "string" , token.closed = !!match[3]
  else if (match[ 4]) token.type = "comment", token.closed = !!match[5]
  else if (match[ 6]) token.type = "number"
  else if (match[ 7]) token.type = "unquotedUrl"
  else if (match[ 8]) token.type = "name"
  else if (match[ 9]) token.type = "punctuator"
  else if (match[10]) token.type = "whitespace"
  return token
}
