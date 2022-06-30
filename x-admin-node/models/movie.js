const mongoose = require('mongoose')

const schema = {
	id: String,
	title: String,
	cover: String,
	category: String,
	director: String,
	actor: String,
	area: String,
	language: String,
	showTime: String,
	intro: String,
	playUrls: [{ type: [{ type: String }] }],
	sort: {
		type: Number,
		default: 1000000
	},
	type: Number, // 1:电影，14：电视剧，21：综艺，26：动漫
	createTime: {
		type: Number,
		default: Date.now()
	},
	clicks: {
		type: Number,
		default: 0
	}
}

const Movie = mongoose.model('movies', mongoose.Schema(schema))

module.exports = Movie
