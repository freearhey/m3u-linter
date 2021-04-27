module.exports = function (lines) {
  const errors = []
  lines.pop()
  lines.forEach((line, index) => {
    if (!line.trim().length) {
      errors.push({
        line: index + 1,
        column: 1,
        message: 'Blank lines not allowed'
      })
    }
  })
  return errors
}
