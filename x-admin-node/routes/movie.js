const router = require('koa-router')()
const Movie = require('../models/movie')
const MovieCollection = require('../models/movieCollection')
const MovieComment = require('../models/movieComment')
const util = require('../utils/util')
const { getSingle } = require('../reptile/movie');
const dayjs = require('dayjs');

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
		const { type, name, category } = ctx.request.query
		const { page, skipIndex } = util.pager(ctx.request.query)
		const params = {}
		if (type) {
			params.type = Number(type)
		}
		if (category) {
			params.category = category
		}
		if (name) {
			params.$or = [{ title: new RegExp(name, 'i') }]
		}
		const query = Movie.find(params, { __v: false }).sort({ createTime: -1 })
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
		const movies = await Movie.find({}, { __v: false }).sort({ clicks: -1 })
		ctx.body = util.success(movies.slice(0, 20))
	} catch (e) {
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

router.get('/collection', async (ctx, next) => {
	try {
		const user = ctx.state.user.data
		const { id, like } = ctx.query
		if (like === '1') {
			const collection = await MovieCollection.create({
				user: user._id,
				movie: id,
			}) 
			ctx.body = util.success(collection)	
		} else {
			const collection = await MovieCollection.findOneAndDelete({
				user: user._id,
				movie: id,
			}) 
			ctx.body = util.success(collection)	
		}
	} catch (e) {
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

router.get('/isCollection', async (ctx, next) => {
	try {
		const { id } = ctx.query
		const user = ctx.state.user.data
		const one = await MovieCollection.findOne({
			movie: id,
			user: user._id
		})
		ctx.body = util.success({
			like: !!one
		})
	} catch (e) {
		console.log(e);
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

router.get('/collections', async (ctx, next) => {
	try {
		const { page, skipIndex } = util.pager(ctx.request.query)
		const user = ctx.state.user.data
		const query = MovieCollection.find({
			user: user._id
		}).populate('movie')
		const list = await query.skip(skipIndex).limit(page.pageSize)
		const total = await MovieCollection.count({user: user._id})
		ctx.body = util.success({
			page: {
				...page,
				total
			},
			list: list.map(item => item.movie)
		})
	} catch (e) {
		console.log(e);
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

router.post('/comment', async (ctx, next) => {
	try {
		const { id, text } = ctx.request.body
		const user = ctx.state.user.data
		const one = await MovieComment.create({
			movie: id,
			user: user._id,
			text,
			createTime: Date.now()
		})
		ctx.body = util.success(one)
	} catch (e) {
		console.log(e);
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

router.get('/comments', async (ctx, next) => {
	try {
		const { page, skipIndex } = util.pager(ctx.request.query)
		const query = MovieComment.find({
			movie: ctx.request.query.id
		}).populate('user').sort({ createTime: -1 })
		const list = await query.skip(skipIndex).limit(page.pageSize)
		const total = await MovieComment.count({movie: ctx.request.query.id})
		list.forEach(item => {
			item._doc.createTime = dayjs(item.createTime).format('YYYY-MM-DD')
		  })
		ctx.body = util.success({
			page: {
				...page,
				total
			},
			list,
		})
	} catch (e) {
		console.log(e);
		ctx.body = util.fail('网络错误，请稍后再试')
	}
})

module.exports = router
