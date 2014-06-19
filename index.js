module.exports = /(\s+)|(\/\*(?:[^*]|\*(?!\/))*(?:\*\/)?)|('(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'?|"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"?)|([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)|(url\((?!\s*["'])\s*(?:[^"'()\\\s]|\\(?:[\da-fA-F]{1,6}\s?|.))*(?:\s*\))?)|((?:[@.]?(?!-?\d)|\#)(?!-+(?![\w\-\u0080-\uFFFF\\]))(?:[\w\-\u0080-\uFFFF]|\\(?:[\da-fA-F]{1,6}\s?|.))+)|([~|^$*]?=|[>~+*\/]|-)|([|[\](){},;!%]|:{1,2})|(^$)|([\s\S])/g
module.exports.names = [
  "whitespace",
  "comment",
  "string",
  "number",
  "unquotedUrl",
  "name",
  "operator",
  "punctuation",
  "empty",
  "invalid"
]