/**
 * 日志
 * @author xmw
 */
const log4js = require('log4js')

// const levels = {
//   trace: log4js.levels.TRACE,
//   debug: log4js.levels.DEBUG,
//   info: log4js.levels.INFO,
//   warn: log4js.levels.WARN,
//   error: log4js.levels.ERROR,
//   fatal: log4js.levels.FATAL
// }

log4js.configure({
  appenders: {
    console: { type: 'console' },
    info: { type: 'file', filename: 'logs/all-logs.log' },
    error: {
      type: 'dateFile',
      filename: 'logs/error',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true // 设置文件名称为filename + pattern
    }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
    info: {
      appenders: ['info', 'console'],
      level: 'info'
    },
    error: {
      appenders: ['console', 'error'],
      level: 'error'
    }
  }
})

exports.debug = (content) => {
  let logger = log4js.getLogger()
  logger.level = 'debug'
  logger.debug(content)
}

exports.error = (content) => {
  let logger = log4js.getLogger('error')
  logger.level = 'error'
  logger.error(content)
}

exports.info = (content) => {
  let logger = log4js.getLogger('info')
  logger.level = 'info'
  logger.info(content)
}
