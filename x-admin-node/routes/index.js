const router = require('koa-router')()

router.get('/*', async (ctx, next) => {
  ctx.body = `
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>x-admin</title>
    <script src="/particles.js"></script>
    <script type="module" crossorigin src="/assets/index.93bbbaea.js"></script>
    <link rel="modulepreload" href="/assets/vendor.68e615e1.js">
    <link rel="stylesheet" href="/assets/index.c7bbdba5.css">
  </head>
  <body>
    <div id="app"></div>
    
  </body>
</html>

  `
})

module.exports = router
