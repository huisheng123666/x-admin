const router = require('koa-router')()
const fs = require('fs')

router.get('/*', async (ctx, next) => {
  ctx.body = fs.readFileSync('../public/index.html')
})

module.exports = router
