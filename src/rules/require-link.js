let IsValidPath = require('is-valid-path')
let validUrl = require('valid-url')

module.exports = function (lines) {
  const errors = []
  let string = lines.join('\n')
  let sections = string.split(/(?=#EXTINF)/g)
  sections.forEach(section => {
    let lines = section.split('\n').filter(Boolean)
    if (!lines.length) return

    let firstLine = lines[0]
    if (!firstLine.startsWith('#EXTINF')) return

    let lastLine = lines[lines.length - 1]
    if (!lastLine) return
    if (IsValidPath(lastLine) || validUrl.isUri(lastLine)) return

    let index = lines.indexOf(lastLine)

    errors.push({
      line: index,
      column: 1,
      message: `The '#EXTINF' directive must be accompanied by a link`
    })
  })
  return errors
}
