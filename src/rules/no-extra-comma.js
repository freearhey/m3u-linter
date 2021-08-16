module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    if (/^(#EXT-X-MEDIA|#EXT-X-STREAM-INF)/.test(line)) return
    const matches = line.startsWith('#EXTINF') ? line.match(/,.*(?=,)/) : line.match(/,/)
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
