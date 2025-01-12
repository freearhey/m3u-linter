module.exports = function (lines) {
  const errors = []
  const localLines = [...lines]
  localLines.pop()
  localLines.forEach((line, index) => {
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
