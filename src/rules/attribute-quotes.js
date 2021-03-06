module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    if (!line.startsWith('#EXTINF:')) return
    const boAttrs = line.match(/ [a-z-]+=/gi)
    if (boAttrs) {
      boAttrs.forEach(attr => {
        const quoteIndex = line.indexOf(attr) + attr.length
        if (line.charAt(quoteIndex) !== '"') {
          errors.push({
            line: index + 1,
            column: quoteIndex + 1,
            message: `The attribute value must be in double quotes`
          })
        }
      })
    }
    const eoAttrs = line.match(/ [a-z-]+="[^"]+/gi)
    if (eoAttrs) {
      eoAttrs.forEach(attr => {
        const quoteIndex = line.indexOf(attr) + attr.length
        const nextChars = line.slice(quoteIndex, quoteIndex + 2)
        if (nextChars !== '" ' && nextChars !== '",') {
          errors.push({
            line: index + 1,
            column: quoteIndex + 1,
            message: `The attribute value must be in double quotes`
          })
        }
      })
    }
  })
  return errors
}
