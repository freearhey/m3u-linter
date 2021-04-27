module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    const matches = line.match(/\s$/)
    if (matches) {
      errors.push({
        line: index + 1,
        column: matches.index + 1,
        message: 'Trailing spaces not allowed'
      })
    }
  })
  return errors
}
