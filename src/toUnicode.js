const toUnicode = (str) => {
  var unicodeString = "";
  for (var i = 0; i < str.length; i++) {
    var theUnicode = str.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = "0" + theUnicode;
    }
    theUnicode = "\\u" + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
};
module.exports = { toUnicode };
