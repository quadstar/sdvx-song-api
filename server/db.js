var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/sdvx');
exports.db = db;