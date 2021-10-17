module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    if (!/^#EXTINF/.test(line)) return
    const matches = line.match(/,(?![^"].*\").*(?=,)/)
    if (matches) {
      errors.push({
        line: index + 1,
        column: matches.index + 1,
        message: 'Unnecessary commas not allowed'
      })
    }
  })
  return errors
}
