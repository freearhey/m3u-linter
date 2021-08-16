module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    const matches = line.match(/ +(?= )/)
    if (matches) {
      errors.push({
        line: index + 1,
        column: matches.index + 1,
        message: 'Multiple spaces not allowed'
      })
    }
  })
  return errors
}
