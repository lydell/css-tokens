module.exports = /(\s+)|(\/\*(?:[^*]|\*(?!\/))*(?:\*\/)?)|('(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'?|"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"?)|([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)|([~|^$*]?=|[>~+*\/]|-(?![\w\u0080-\uFFFF\\]))|([|[\](){},;!%]|:{1,2})|(url\((?!\s*["'])\s*(?:[^"'()\\\s]|\\(?:[\da-fA-F]{1,6}\s?|.))*(?:\s*\))?)|((?:[@.]?(?!--|-?\d)|\#)(?:[\w\-\u0080-\uFFFF]|\\(?:[\da-fA-F]{1,6}\s?|.))+)|(^$)|([\s\S])/g
module.exports.names = [
  "whitespace",
  "comment",
  "string",
  "number",
  "operator",
  "punctuation",
  "unquotedUrl",
  "name",
  "empty",
  "invalid"
]