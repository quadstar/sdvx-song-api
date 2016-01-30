var mongoose = require('mongoose');
var SongSchema = new mongoose.Schema({
 game: String,
 title: String,
 artist: String,
 difficulty_level: Number,
 difficulty_cat: String,
 difficulty_tier: Number
});

module.exports = mongoose.model('Song', SongSchema);