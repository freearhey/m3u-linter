#! /usr/bin/env node
const { program } = require('commander')
const package = require('../package.json')
const Linter = require('../src/index.js')
const Logger = require('../src/utils/logger.js')
const fs = require('fs')

let fileList = []
program
  .version(package.version)
  .name(package.name)
  .description(package.description)
  .option('--config [filePath]', 'config file', 'm3u-linter.config.json')
  .arguments('[fileList...]')
  .action((args = []) => (fileList = args.length > 0 ? args : undefined))
  .parse(process.argv)

const options = program.opts()
const configFilePath = options.config
if (!configFilePath) {
  onError('Config file is required')
} else {
  fs.readFile(configFilePath, (fileError, data) => {
    if (fileError) {
      onError(`Error loading config file ${configFilePath}`)
    } else {
      const configJson = JSON.parse(data.toString())
      Linter.lint(configJson, fileList)
        .then(numErrors => {
          if (numErrors === 0) {
            process.exit(0)
          } else {
            process.exit(1)
          }
        })
        .catch(lintError => {
          onError(lintError.toString())
        })
    }
  })
}

function onError(error) {
  Logger.error(error)
  process.exit(1)
}
