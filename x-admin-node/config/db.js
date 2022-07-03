const mongoose = require('mongoose')
const config = require('./index')
const log4js = require('../utils/log')
const dataInit = require('./datainit')
const { getMovies } = require('../reptile/movie')
const schedule = require('node-schedule')

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

db.on('open', async () => {
  log4js.info(`***数据库连接成功`)
  await dataInit()
  schedule.scheduleJob('15 20 * * *', async () => {
    await getMovies(14)
  })
  schedule.scheduleJob('15 21 * * *', async () => {
    await getMovies(21)
    await getMovies(26)
  })
  schedule.scheduleJob('15 2 * * *', async () => {
    await getMovies(1)
  })
  try {
    await getMovies(1)
    await getMovies(14)
    // await getMovies(21)f
    // await getMovies(26)
  } catch (e) {
    console.error(e)
  }
})
