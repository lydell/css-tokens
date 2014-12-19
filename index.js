// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

// This regex comes from regex.coffee, and is inserted here by generate-index.js
// (run `npm run build`).
module.exports = /((['"])(?:(?!\2)[^\\\r\n]|\\(?:\r\n|[\s\S]))*(\2)?)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)|(url\((?!\s*["'])\s*(?:[^"'()\\\s]|\\(?:[\da-fA-F]{1,6}\s?|.))*(?:\s*\))?)|((?:[@.]?(?!-?\d)|\#)(?!-+(?![\w\-\u0080-\uFFFF\\]))(?:[\w\-\u0080-\uFFFF]|\\(?:[\da-fA-F]{1,6}\s?|.))+)|([~|^$*]?=|[>~+*\/]|-)|([|[\](){},;!%]|:{1,2})|(\s+)|(^$|[\s\S])/g

module.exports.matchToToken = function(match) {
  token = {type: "invalid", value: match[0]}
  if (match[ 1]) token.type = "string" , token.closed = !!match[3]
  if (match[ 4]) token.type = "comment", token.closed = !!match[5]
  if (match[ 6]) token.type = "number"
  if (match[ 7]) token.type = "unquotedUrl"
  if (match[ 8]) token.type = "name"
  if (match[ 9]) token.type = "operator"
  if (match[10]) token.type = "punctuation"
  if (match[11]) token.type = "whitespace"
  return token
}
