module.exports = function (lines) {
  const errors = []
  let prevLinkIndex = 0
  lines.forEach((line, index) => {
    if (!line.startsWith('#')) {
      let prevLines = lines.slice(prevLinkIndex, index)
      if (!prevLines.find(l => l.startsWith('#EXTINF:'))) {
        errors.push({
          line: index + 1,
          column: 1,
          message: `Resource must have a corresponding '#EXTINF:' directive`
        })
      }
      prevLinkIndex = index
    }
  })
  return errors
}
