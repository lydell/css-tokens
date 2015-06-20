// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var fs = require("fs")

require("coffee-script/register")
var regex = require("./regex.coffee")

var code = fs.readFileSync("index.js").toString()

var regexString = ""
// Older V8 versions are buggy and don’t escape slashes correctly.
if (RegExp("/").source === "/") {
  regexString = "/" + regex.source.replace(/\//g, "\\/") + "/g"
} else {
  regexString = regex.toString()
}

code = code.replace(/\/.+\/.+/, regexString)
fs.writeFileSync("index.js", code)
