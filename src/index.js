const Logger = require('./utils/logger')
const fs = require('fs')
const glob = require('glob')

module.exports = {
  lint(config, files) {
    return new Promise((resolve, reject) => {
      const filePaths = files || config.files
      if (!filePaths) {
        Logger.error('The path to the input file is not specified')
        resolve()
      } else {
        const promises = []
        filePaths.forEach(filePath => {
          promises.push(this.checkFile(filePath, config))
        })
        Promise.all(promises).then(results => {
          const totalLintErrors = results.reduce((prev, curr) => prev + curr, 0)
          if (totalLintErrors > 0) {
            Logger.error(`${totalLintErrors} errors`)
          }
          resolve(totalLintErrors)
        })
      }
    })
  },
  checkFile(filePath, config) {
    return new Promise(resolve => {
      glob(filePath, (globError, files) => {
        if (globError) {
          Logger.error(globError.toString())
        } else {
          let filesRead = 0
          let lintErrors = 0
          files.forEach(file => {
            fs.readFile(file, (fileError, data) => {
              if (fileError) {
                Logger.error(fileError.toString())
              } else {
                const errors = []
                const fileString = data.toString()
                const lines = fileString.split('\n')

                for (let rule in config.rules) {
                  if (config.rules[rule]) {
                    const validate = require(`./rules/${rule}.js`)
                    validate(lines).forEach(err => {
                      errors.push({
                        ...err,
                        rule
                      })
                    })
                  }
                }

                if (errors.length > 0) {
                  lintErrors += errors.length
                  Logger.results(file, errors)
                }
              }

              if (++filesRead === files.length) {
                resolve(lintErrors)
              }
            })
          })
        }
      })
    })
  }
}
