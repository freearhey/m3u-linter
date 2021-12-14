module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    if (!/^#EXTINF/.test(line)) return
    const [_, title] = line.match(/,(?![^"].*\")(.*)/) || [null, null]
    if (!title) {
      errors.push({
        line: index + 1,
        column: 1,
        message: 'The resource must have a title'
      })
    }
  })
  return errors
}
