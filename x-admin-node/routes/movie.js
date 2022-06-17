const router = require('koa-router')()
const Movie = require('../models/movie')
const util = require('../utils/util')
const { getSingle } = require('../reptile/movie');

router.prefix('/api/movie')

router.get('/list', async (ctx, next) => {
  const { type, name } = ctx.request.query
  const { page, skipIndex } = util.pager(ctx.request.query)
	const params = {}
	if (type) {
		params.type = Number(type)
	}
	if (name) {
		params.$or = [{ title: new RegExp(name, 'i') }]
	}
	const query = Movie.find(params, { __v: false, _id: false }).sort({ createTime: -1 })
	const list = await query.skip(skipIndex).limit(page.pageSize)
	const total = await Movie.count(params)
	ctx.body = util.success({
		page: {
			...page,
			total
		},
		list
	})
})

router.delete('/:id', async (ctx, next) => {
  try {
    const movie = await Movie.findOneAndDelete({ id: ctx.params.id })
    ctx.body = util.success(movie.id)
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

router.post('/single', async (ctx, next) => {
  try {
    const res = await getSingle(ctx.request.body.id, ctx.request.body.type)
    ctx.body = util.success(res)
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

module.exports = router