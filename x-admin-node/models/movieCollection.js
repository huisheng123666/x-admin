/**
 * 部门
 */
 const mongoose = require('mongoose')
 
 const schema = {
   user: {
     type: mongoose.Types.ObjectId,
     ref: 'users'
   },
   movie: {
    type: mongoose.Types.ObjectId,
    ref: 'movies'
   }
 }
 
 const MovieCollection = mongoose.model('movieCollections', mongoose.Schema(schema))
 
 module.exports = MovieCollection
 