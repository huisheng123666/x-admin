const router = require('koa-router')()

router.get('/*', async (ctx, next) => {
  ctx.body = `
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/x/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>x-admin</title>
    <script src="/x/particles.js"></script>
    <script type="module" crossorigin src="/x/assets/index.0fa2a97f.js"></script>
    <link rel="modulepreload" href="/x/assets/vendor.76307f7a.js">
    <link rel="stylesheet" href="/x/assets/index.7d3b07bc.css">
  </head>
  <body>
    <div id="app"></div>
    
  </body>
</html>
  `
})

module.exports = router
