const chalk = require('chalk')
const path = require('path')

module.exports = {
  results(filePath, errors) {
    this.log(`\n${chalk.underline.white(path.resolve(filePath))}`)

    const findLargestReducer = (prev, curr) => {
      return curr > prev ? curr : prev
    }
    const longestLineChars = errors
      .map(error => `${error.line}:${error.column}`.length)
      .reduce(findLargestReducer, 0)
    const longestMsgChars = errors.map(error => error.message.length).reduce(findLargestReducer, 0)

    errors
      .sort((a, b) => {
        if (a.line < b.line) return -1
        if (a.line > b.line) return 1
        if (a.column < b.column) return -1
        if (a.column > b.column) return 1
        return 0
      })
      .forEach(error => {
        const lineText = padString(`${error.line}:${error.column}`, longestLineChars)
        const line = chalk.gray(lineText)
        const msg = chalk.white(padString(error.message, longestMsgChars))
        const rule = chalk.gray(error.rule)

        this.log(`  ${line}  ${msg}  ${rule}`)
      })
  },
  info(message) {
    if (message) {
      this.log(`\n${message}\n`)
    }
  },
  success(message) {
    if (message) {
      this.log(`\n${chalk.green(message)}\n`)
    }
  },
  error(message) {
    if (message) {
      this.log(`\n${chalk.red(message)}\n`)
    }
  },
  log(message) {
    console.log(message)
  }
}

function padString(string, longest) {
  if (string.length < longest) {
    Array(longest - string.length)
      .fill(null)
      .forEach(() => {
        string += ' '
      })
  }
  return string
}
