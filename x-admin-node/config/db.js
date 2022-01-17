const mongoose = require('mongoose')
const config = require('./index')
const log4js = require('../utils/log')

mongoose.connect(config.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  // if (err) {
  //   log4js.error(`数据库链接失败: ${err}`)
  //   return
  // }
  // console.log('mongodb is connected!')
})

const db = mongoose.connection;

db.on('error', (err) => {
  log4js.error(`***数据库连接失败: ${err}`)
})

db.on('open', () => {
  log4js.info(`***数据库连接成功`)
})
