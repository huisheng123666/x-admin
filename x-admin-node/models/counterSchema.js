/**
 * 用户id
 */
const mongoose = require('mongoose')

const schema = {
  _id: String,
  sequence_val: Number
}

const Counter = mongoose.model('counter', mongoose.Schema(schema))

module.exports = Counter
