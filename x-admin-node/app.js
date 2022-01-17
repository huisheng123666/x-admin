const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaJwt = require('koa-jwt')

// const logger = require('koa-logger')
const log4js = require('./utils/log')
const util = require('./utils/util')

const index = require('./routes/index')
const users = require('./routes/users')
const menus = require('./routes/menus')
const roles = require('./routes/roles')
const dept = require('./routes/dept')
const holiday = require('./routes/holiday')

// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  // console.log(ss)
  // const start = new Date()
  // await next()
  // const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  log4js.info('log out put')
  await next().catch(err => {
    if (err.status === 401) {
      ctx.status = 200
      ctx.body = util.fail('token认证失败', util.CODE.AUTH_ERROR)
    } else {
      throw err
    }
  })
})

app.use(koaJwt({ secret: 'xmw' }).unless({
  path: ['/api/users/login', '/api/menu/all/list']
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(menus.routes(), menus.allowedMethods())
app.use(roles.routes(), roles.allowedMethods())
app.use(dept.routes(), dept.allowedMethods())
app.use(holiday.routes(), holiday.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4js.error(`${err.stack}`)
});

module.exports = app
