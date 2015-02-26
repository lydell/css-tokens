// Copyright 2014, 2015 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var fs        = require("fs")
var util      = require("util")
var assert    = require("assert")
var cssTokens = require("../")


suite("cssTokens", function() {

  test("is a regex", function() {
    assert(util.isRegExp(cssTokens))
  })

})


suite("cssTokens.matchToToken", function() {

  test("is a function", function() {
    assert.equal(typeof cssTokens.matchToToken, "function")
  })

})


suite("tokens", function() {

  function token(name, fn) {
    suite(name, fn.bind(null, matchHelper.bind(null, name)))
  }

  function matchHelper(type, string, expected, extra) {
    extra = extra || {}
    if (typeof expected === "object") {
      extra = expected
      expected = undefined
    }
    cssTokens.lastIndex = 0
    var token = cssTokens.matchToToken(cssTokens.exec(string))

    test(string, function() {
      if (expected === false) {
        assert.notEqual(token.type, type)
      } else {
        assert.equal(token.type, type)
        assert.equal(
          token.value,
          (typeof expected === "string" ? expected : string)
        )
        if ("closed" in extra) {
          assert.equal(token.closed, extra.closed)
        } else if (type === "string" || type === "comment") {
          assert.equal(token.closed, true)
        }
      }
    })
  }


  token("whitespace", function(match) {

    match(" ")
    match("    ")
    match(" a", " ")
    match("\t")
    match("\t\t\t")
    match("\ta", "\t")
    match("\n")
    match("\n\n\n")
    match("\na", "\n")
    match("\r")
    match("\r\r\r")
    match("\ra", "\r")
    match("\f")
    match("\f\f\f")
    match("\fa", "\f")
    match(" \t\n\r\f \r\n")
    match(" \t\n\r\f \r\n-1", " \t\n\r\f \r\n")

  })


  token("comment", function(match) {

    match("/**/")
    match("/*comment*/")
    match("/* comment */")
    match("/***/")
    match("/*/*/")
    match("/*\n\r\f \r\n*/")

    match("/*", {closed: false})
    match("/*/", {closed: false})
    match("/*unclosed", {closed: false})
    match("/*unclosed\n@new .Line{is:this;}code:any(.true,.false) {}", {closed: false})

  })


  token("string", function(match) {

    match("''")
    match('""')
    match("'string'")
    match('"string"')
    match("'\\''")
    match('"\\""')
    match("'\\\\''", "'\\\\'")
    match('"\\\\""', '"\\\\"')
    match("'\\\\\\''")
    match('"\\\\\\""')
    match("'\\1d306'")
    match('"\\1d306"')
    match("'\\\n'")
    match('"\\\n"')
    match("'\\\r'")
    match('"\\\r"')
    match("'\\\f'")
    match('"\\\f"')
    match("'\\\r\n'")
    match('"\\\r\n"')
    match("'string'code'another string'", "'string'")
    match('"string"code"another string"', '"string"')
    match("'\"'")
    match('"\'"')

    match("'", {closed: false})
    match('"', {closed: false})
    match("'unclosed", {closed: false})
    match('"unclosed', {closed: false})
    match("'\n", "'", {closed: false})
    match('"\n', '"', {closed: false})
    match("'\r", "'", {closed: false})
    match('"\r', '"', {closed: false})
    match("'\f", "'", {closed: false})
    match('"\f', '"', {closed: false})
    match("'\r\n", "'", {closed: false})
    match('"\r\n', '"', {closed: false})
    match("'\\\n", {closed: false})
    match('"\\\n', {closed: false})
    match("'\\\r", {closed: false})
    match('"\\\r', {closed: false})
    match("'\\\f", {closed: false})
    match('"\\\f', {closed: false})
    match("'\\\r\n", {closed: false})
    match('"\\\r\n', {closed: false})

  })


  token("number", function(match) {

    match("1")
    match("1.", "1")
    match("1..", "1")
    match("0.1")
    match(".1")
    match("0.1.", "0.1")

    match("-1")
    match("-1.", "-1")
    match("-1..", "-1")
    match("-0.1")
    match("-.1")
    match("-0.1.", "-0.1")
    match("-", false)

    match("1e1")
    match("1.e1", "1")
    match("1.e1.", "1")
    match("0.1e1")
    match(".1e1")
    match("0.1e1.", "0.1e1")

    match("1e+1")
    match("1e-1")
    match("1e0123")
    match("1e0.123", "1e0")
    match("1e0x123", "1e0")
    match("1E1")
    match("1E+1")
    match("1E-1")
    match("1E0123")
    match("1E0.123", "1E0")
    match("1E0x123", "1E0")

    match("e1", false)
    match("e+1", false)
    match("e-1", false)
    match("E1", false)
    match("E+1", false)
    match("E-1", false)

    match("-e1", false)
    match("-e+1", false)
    match("-e-1", false)
    match("-E1", false)
    match("-E+1", false)
    match("-E-1", false)

  })


  token("punctuator", function(match) {

    match("~=")
    match("|=")
    match("^=")
    match("$=")
    match("*=")
    match("=")
    match(">")
    match("~")
    match("+")
    match("-")
    match("*")
    match("/")

    match("-/**/", "-")
    match("-''", "-")
    match("--custom-prop", false)

    match("|")
    match("[")
    match("]")
    match("(")
    match(")")
    match("{")
    match("}")
    match(",")
    match(";")
    match(":")
    match("::")
    match("!")
    match("%")

  })


  token("unquotedUrl", function(match) {

    match("url(http://www.w3.org/2000/svg)")
    match("url('http://www.w3.org/2000/svg')", false)
    match('url("http://www.w3.org/2000/svg")', false)

    match("url(http://www.w3.org/2000/svg_\\(legacy\\))")
    match("url(http://www.w3.org/2000/svg_\\(legacy))", "url(http://www.w3.org/2000/svg_\\(legacy)")
    match("url(http://www.w3.org/2000/svg_(legacy))", "url(http://www.w3.org/2000/svg_")

    match("url( http://www.w3.org/2000/svg )")
    match("url( 'http://www.w3.org/2000/svg' )", false)
    match('url( "http://www.w3.org/2000/svg" )', false)

    match("url(\nhttp://www.w3.org/2000/svg\n)")
    match("url(\n'http://www.w3.org/2000/svg'\n)", false)
    match('url(\n"http://www.w3.org/2000/svg"\n)', false)

    match("url(\rhttp://www.w3.org/2000/svg\r)")
    match("url(\r'http://www.w3.org/2000/svg'\r)", false)
    match('url(\r"http://www.w3.org/2000/svg"\r)', false)

    match("url(\fhttp://www.w3.org/2000/svg\f)")
    match("url(\f'http://www.w3.org/2000/svg'\f)", false)
    match('url(\f"http://www.w3.org/2000/svg"\f)', false)

    match("url(\r\nhttp://www.w3.org/2000/svg\r\n)")
    match("url(\r\n'http://www.w3.org/2000/svg'\r\n)", false)
    match('url(\r\n"http://www.w3.org/2000/svg"\r\n)', false)

    match("url(typo '/images/foo.png')", "url(typo")
    match("url('/images/foo.png' typo)", false)

    match("url()")
    match("url(\\))")
    match("url(\\\\))", "url(\\\\)")
    match("url(\\\\\\))")
    match("url(\\1d306)")
    match("url(\\\n)", "url(")
    match("url(\\\r)", "url(")
    match("url(\\\f)", "url(")
    match("url(\\\r\n)", "url(")
    match("url(foo)code url(another foo)", "url(foo)")

    match("url(\\0)")
    match("url(\\0 )")
    match("url(\\0 a)")
    match("url(\\01)")
    match("url(\\01 )")
    match("url(\\01 a)")
    match("url(\\012)")
    match("url(\\012 )")
    match("url(\\012 a)")
    match("url(\\0123)")
    match("url(\\0123 )")
    match("url(\\0123 a)")
    match("url(\\01234)")
    match("url(\\01234 )")
    match("url(\\01234 a)")
    match("url(\\012345)")
    match("url(\\012345 )")
    match("url(\\012345 a)")
    match("url(\\0123456)")
    match("url(\\0123456 )")
    match("url(\\0123456 a)", "url(\\0123456")
    match("url(\\01234567)")
    match("url(\\01234567 )")
    match("url(\\01234567 a)", "url(\\01234567")
    match("url(\\012345678)")
    match("url(\\012345678 )")
    match("url(\\012345678 a)", "url(\\012345678")
    match("url(\\0123456789)")
    match("url(\\0123456789 )")
    match("url(\\0123456789 a)", "url(\\0123456789")
    match("url(\\15cF)")
    match("url(\\15cG)")
    match("url(a\\012345b)")
    match("url(a\\012345 b)")
    match("url(a\\01 b)")
    match("url(a\\@b)")
    match("url(a\\@ b)", "url(a\\@")

    match("url(")
    match("url(unclosed")
    match("url(\n")
    match("url(\r")
    match("url(\f")
    match("url(\r\n")
    match("url(a\n", "url(a")
    match("url(a\r", "url(a")
    match("url(a\f", "url(a")
    match("url(a\r\n", "url(a")
    match("url(a\nb", "url(a")
    match("url(a\rb", "url(a")
    match("url(a\fb", "url(a")
    match("url(a\r\nb", "url(a")

  })


  token("name", function(match) {

    ;["", "@", "."].forEach(function(c) {
      match(c + "_")
      match(c + "a")
      match(c + "z")
      match(c + "A")
      match(c + "Z")
      match(c + "å")
      match(c + "π")
      match(c + "0", false)
      match(c + "0a", false)
      match(c + "_0")
      match(c + "a0")
      match(c + "z0")
      match(c + "A0")
      match(c + "Z0")
      match(c + "å0")
      match(c + "π0")
      match(c + "a_56åπ")
      match(c + "Iñtërnâtiônàlizætiøn☃💩") // The last character is Pile of poo.
      match(c + "$", false)
      match(c + "a\u00a0\u2028\u2029b") // Unicode whitespace is allowed.

      match(c + "-a")
      match(c + "-0", false)
      match(c + "-π")
      match(c + "--a")
      match(c + "--\\A")
      match(c + "a-")
      match(c + "a-b")
      match(c + "a--b")
      match(c + "a--b-")
      match(c + "a--b--")
      match(c + "-webkit-foo")
      match(c + "-moz-foo")
      match(c + "-o-foo")
      match(c + "-ms-foo")
      match(c + "--custom-prop")
      match(c + "-----dashes-ftw")
      match(c + "-", false)
      match(c + "--", false)
      match(c + "---", false)

      match(c + "\\0")
      match(c + "\\0 ")
      match(c + "\\01")
      match(c + "\\01 ")
      match(c + "\\012")
      match(c + "\\012 ")
      match(c + "\\0123")
      match(c + "\\0123 ")
      match(c + "\\01234")
      match(c + "\\01234 ")
      match(c + "\\012345")
      match(c + "\\012345 ")
      match(c + "\\0123456")
      match(c + "\\0123456 ", c + "\\0123456")
      match(c + "\\01234567")
      match(c + "\\01234567 ", c + "\\01234567")
      match(c + "\\012345678")
      match(c + "\\012345678 ", c + "\\012345678")
      match(c + "\\0123456789")
      match(c + "\\0123456789 ", c + "\\0123456789")
      match(c + "\\15cF")
      match(c + "\\15cG")
      match(c + "a\\012345b")
      match(c + "a\\012345 b")
      match(c + "a\\01 b")
      match(c + "\\@\\#\\.\\>\\~\\+\\[\\]\\(\\)\\{\\}\\,\\;\\:\\!\\%\\/")
      match(c + "a\\@b")
      match(c + "a\\@ b", c + "a\\@")
      match(c + "\\\n", false)
      match(c + "\\\r", false)
      match(c + "\\\f", false)
      match(c + "\\\r\n", false)
    })

    match("#_")
    match("#a")
    match("#z")
    match("#A")
    match("#Z")
    match("#å")
    match("#π")
    match("#0")
    match("#0a") // Hex color support.
    match("#_0")
    match("#a0")
    match("#z0")
    match("#A0")
    match("#Z0")
    match("#å0")
    match("#π0")
    match("#a_56åπ")
    match("#Iñtërnâtiônàlizætiøn☃💩") // The last character is Pile of poo.
    match("#$", false)

    match("#-a")
    match("#-0")
    match("#-π")
    match("#--a")
    match("#--\\A")
    match("#a-")
    match("#a-b")
    match("#a--b")
    match("#a--b-")
    match("#a--b--")
    match("#-webkit-foo")
    match("#-moz-foo")
    match("#-o-foo")
    match("#-ms-foo")

    match("#\\0")
    match("#\\0 ")
    match("#\\01")
    match("#\\01 ")
    match("#\\012")
    match("#\\012 ")
    match("#\\0123")
    match("#\\0123 ")
    match("#\\01234")
    match("#\\01234 ")
    match("#\\012345")
    match("#\\012345 ")
    match("#\\0123456")
    match("#\\0123456 ", "#\\0123456")
    match("#\\01234567")
    match("#\\01234567 ", "#\\01234567")
    match("#\\012345678")
    match("#\\012345678 ", "#\\012345678")
    match("#\\0123456789")
    match("#\\0123456789 ", "#\\0123456789")
    match("#\\15cF")
    match("#\\15cG")
    match("#a\\012345b")
    match("#a\\012345 b")
    match("#a\\01 b")
    match("#\\@\\#\\.\\>\\~\\+\\[\\]\\(\\)\\{\\}\\,\\;\\:\\!\\%\\/")
    match("#a\\@b")
    match("#a\\@ b", "#a\\@")
    match("#\\\n", false)
    match("#\\\r", false)
    match("#\\\f", false)
    match("#\\\r\n", false)

  })


  token("invalid", function(match) {

    match("")
    match("@")
    match("#")
    match(".")
    match("<")
    match("$")
    match("&")
    match("`")
    match("\\")
    match("\u0000")
    match("\u007F")

  })

})


suite("tokenization", function() {

  function testFile(file) {
    var contents = fs.readFileSync("test/fixtures/" + file + ".css").toString()
    var expected = require("./fixtures/" + file + ".json")
    var actual = contents.match(cssTokens)
    test(file + ".css", function() {
      assert.deepEqual(actual, expected)
      assert.equal(actual.join(""), contents)
    })
  }

  testFile("sample")
  testFile("errors")
  testFile("html5-id")
  testFile("crazy-class")

})
