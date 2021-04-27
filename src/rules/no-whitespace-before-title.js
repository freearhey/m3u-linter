module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    if (!line.startsWith('#EXTINF:')) return
    const matches = line.split(',')
    if (/^\s/.test(matches[1])) {
      errors.push({
        line: index + 1,
        column: line.indexOf(matches[1]) + 1,
        message: 'Unexpected whitespace before the title'
      })
    }
  })
  return errors
}
