module.exports = function (lines) {
  const errors = []
  lines.forEach((line, index) => {
    const boAttrs = line.match(/[a-z-]+=/gi)
    const eoAttrs = line.match(/[a-z-]+="[^=",]+/gi)
    if (!eoAttrs && !boAttrs) return
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
    eoAttrs.forEach(attr => {
      const quoteIndex = line.indexOf(attr) + attr.length
      if (line.charAt(quoteIndex) !== '"') {
        errors.push({
          line: index + 1,
          column: quoteIndex + 1,
          message: `The attribute value must be in double quotes`
        })
      }
    })
  })
  return errors
}
