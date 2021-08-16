module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    if (!/^#/.test(line)) return
    const matches = line.match(/.*(?=,).*([^,\s]\()/)
    if (matches) {
      errors.push({
        line: index + 1,
        column: matches.index + 2,
        message: 'Space before the opening parenthesis is required'
      })
    }
  })
  return errors
}
