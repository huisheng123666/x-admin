const superagent = require('superagent')
const cheerio = require('cheerio')
const Movie = require('../models/movie')

const moviePageUrl = (type) => `https://www.ylzy1.com/index.php/vod/type/id/${type}.html`

function sleep(time) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}


async function getJq(url) {
	const res = await superagent.get(url)
	const $ = cheerio.load(res.text)
	return $
}

async function getMovieList(url) {
	const $ = await getJq(url)
	const links = []
	$('.videoName').map((index, ele) => {
		const url = $(ele).attr('href')
		if (url) {
			links.push('https://www.ylzy1.com/' + url)
		}
	})
	return links.slice(0, 10)
}

async function getDetail(url) {
	const $ = await getJq(url)
	const detail = {
		id: url.split('id/')[1].split('.')[0],
		playUrls: []
	}
	const blocks = $('.width1200.white')
	detail.cover = blocks.find('.left').find('img').attr('src')
	detail.title = blocks.eq(0).find('.whitetitle').text().slice(3)
	const desc = blocks.eq(0).find('.right').find('p')
	detail.category = desc.eq(2).text().slice(3)
	detail.director = desc.eq(3).text().slice(3)
	detail.actor = desc.eq(4).text().slice(3)
	detail.area = desc.eq(5).text().slice(3)
	detail.language = desc.eq(6).text().slice(3)
	detail.showTime = desc.eq(7).text().slice(3)
	detail.intro = blocks.eq(1).find('div').text()
	$('.playlist.wbox').map((index, ele) => {
		const urls = []
		$(ele).find('font').map((index, ele) => {
			const url = $(ele).text().split('$')[1]
			url && urls.push(url)
		})
		detail.playUrls.push(urls)
	})
	return detail
}


async function getMovies(type = 1) {
	const links = await getMovieList(moviePageUrl(type))
	for (let i = 0; i < links.length; i++) {
		const detail = await getDetail(links[i])
		const hasMovie = await Movie.findOne({ id: detail.id })
		if (hasMovie) {
			await Movie.findOneAndUpdate({ id: detail.id }, detail)
		} else {
			await Movie.create({
				...detail,
				type,
              createTime: Date.now()
			})
		}
		console.log(detail.title, detail.playUrls);
		await sleep(5000)
	}
}

async function getSingle(id, type) {
  const link = `https://www.ylzy1.com/index.php/vod/detail/id/${id}.html`
  const detail = await getDetail(link)
  const hasMovie = await Movie.findOne({ id: detail.id })
  if (hasMovie) {
    await Movie.findOneAndUpdate({ id: detail.id }, {
			...detail,
			type,
			createTime: Date.now()
		})
  } else {
    await Movie.create({
      ...detail,
      type,
      createTime: Date.now()
    })
  }
}

module.exports = {
  getMovies,
  getSingle
}
