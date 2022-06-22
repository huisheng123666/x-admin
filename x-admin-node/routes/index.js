const router = require('koa-router')()
const fs = require('fs')

router.get('/*', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf-8')
  ctx.body = fs.readFileSync('public/x/index.html')
})

module.exports = router
