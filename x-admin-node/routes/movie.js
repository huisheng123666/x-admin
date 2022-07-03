const router = require('koa-router')()
const Movie = require('../models/movie')
const util = require('../utils/util')
const { getSingle } = require('../reptile/movie');

router.prefix('/api/movie')

function sleep(time) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

router.get('/list', async (ctx, next) => {
	try {
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
	} catch (e) {
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

router.delete('/:id', async (ctx, next) => {
  try {
    const movie = await Movie.findOneAndDelete({ id: ctx.params.id })
    ctx.body = util.success(movie.id)
  } catch (e) {
    ctx.body = util.fail('网络错误，请稍后再试')
  }
})

router.post('/single', async (ctx, next) => {
  try {
    const res = await getSingle(ctx.request.body.id, ctx.request.body.type)
    ctx.body = util.success(res)
  } catch (e) {
    ctx.body = util.fail('网络错误，请稍后再试')
  }
})

router.post('/edit', async (ctx, next) => {
	try {
		const { id } = ctx.request.body
		const params = { ...ctx.request.body }
		delete params.id
		const movie = await Movie.findOneAndUpdate({ id }, params, { __id: 0, __v: 0 })
		ctx.body = util.success(movie)
	} catch (e) {
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

router.get('/recommend', async (ctx, next) => {
	try {
		const movies = await Movie.find({}, { __v: false, _id: false }).sort({ clicks: -1 })
		ctx.body = util.success(movies.slice(0, 20))
	} catch (e) {
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

module.exports = router
