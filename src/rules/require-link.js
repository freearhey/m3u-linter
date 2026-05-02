let IsValidPath = require('is-valid-path')

function isURI(string) {
  try {
    const url = new URL(string)
    return /^(http:|https:|mms:|mmsh:|rtsp:|rtmp:|srt:|rtp:|udp:|smb:|ftp:|nfs:)/.test(url.protocol)
  } catch {
    return false
  }
}

module.exports = function (lines) {
  const errors = []
  let string = lines.join('\n')
  let sections = string.split(/(?=#EXTINF)/g)
  let currentLineIndex = 0
  sections.forEach(section => {
    section = section.replace(/\n$/g, '')
    let sectionLines = section.split('\n')
    let sectionLength = sectionLines.length
    currentLineIndex += sectionLength
    sectionLines = sectionLines.filter(Boolean)

    if (!sectionLines.length) return

    let firstLine = sectionLines[0]
    if (!firstLine.startsWith('#EXTINF')) return

    let lastLine = sectionLines[sectionLines.length - 1]
    if (!lastLine) return

    if (isURI(lastLine) || IsValidPath(lastLine)) return

    errors.push({
      line: currentLineIndex - sectionLength + 1,
      column: 1,
      message: `The '#EXTINF' directive must be accompanied by a link`
    })
  })
  return errors
}
