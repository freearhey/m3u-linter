const isValidPath = require('is-valid-path')
const validUrl = require('valid-url')

module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    if (
      line.trim().length &&
      (isValidPath(line) || validUrl.isUri(line)) &&
      lines[index - 1] &&
      !lines[index - 1].startsWith('#EXTINF:')
    ) {
      errors.push({
        line: index + 1,
        column: 1,
        message: `Resource must have a corresponding '#EXTINF:' directive`
      })
    }
  })
  return errors
}
