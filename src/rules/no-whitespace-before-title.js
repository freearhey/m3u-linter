module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    if (!line.startsWith('#EXTINF:')) return
    const commaIndex = line.lastIndexOf(',')
    const title = line.slice(commaIndex + 1, line.length)
    if (/^\s/.test(title)) {
      errors.push({
        line: index + 1,
        column: commaIndex + 2,
        message: 'Unexpected whitespace before the title'
      })
    }
  })
  return errors
}
