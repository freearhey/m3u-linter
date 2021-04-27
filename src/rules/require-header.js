module.exports = function (lines) {
  if (!/^#EXTM3U/.test(lines[0])) {
    return [
      {
        line: 1,
        column: 1,
        message: `File must begin with '#EXTM3U' directive`
      }
    ]
  }

  return []
}
