// util
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var db = require('./db.js');
var Song = require('./models.js');

// currently running this in bash with node. 
// Should not require in index.js until security, updating docs, and duplicate docs are handled.

function fetcher(cb){
  request('https://remywiki.com/SOUND_VOLTEX_BOOTH#New_Songs', function (error, response, html) {
  	if (!error) {
   	 var $ = cheerio.load(html);
   	 var dog = $('tr');
   	 var docs = [];
   	 dog.each(function(i, element){
   	 	var title = $(this).children('td').first();
   	 	if(title.text() !== '' && i > 4){ 	
   	 		if(title.text()===' Dynasty'){
   	 			console.log('boop');
   	 		}	
	   	  	var artist = $(title).next();
	   	 	var BPM = $(artist).next();
	   	 	var diffNov = $(BPM).next();
	   	 	var diffAdv = $(diffNov).next();
	   	 	var diffExh = $(diffAdv).next();
	   	 	var newDoc1 = {
	   	 		title: title.text().trim(),
	   	 		artist: artist.text().trim(),
	   	 		difficulty_cat: "NOV",
	   	 		difficulty_level: parseInt(diffNov.text().trim()),
	   	 		game: "sdvx1"
	   	 	}, newDoc2 = {
	   	 		title: title.text().trim(),
	   	 		artist: artist.text().trim(),
	   	 		difficulty_cat: "ADV",
	   	 		difficulty_level: parseInt(diffAdv.text().trim()),
	   	 		game: "sdvx1"
	   	 	}, newDoc3 = {
	   	 		title: title.text().trim(),
	   	 		artist: artist.text().trim(),
	   	 		difficulty_cat: "EXH",
	   	 		difficulty_level: parseInt(diffExh.text().slice(0, -1).trim()),
	   	 		game: "sdvx1"
	   	 	};
	   	 	docs.push(newDoc1, newDoc2, newDoc3);
   	 	}
   	});
	Song.find()
	Song.collection.insert(docs, function(result){
		// cb('good');
		console.log('done');
	});
	}  	
  });
}

var fetcher2 = function(cb){
  request('https://remywiki.com/SOUND_VOLTEX_II_-infinite_infection-#New_Songs', function (error, response, html) {
  	if (!error) {
   	 var $ = cheerio.load(html);
   	 var dog = $('tr');
   	 var docs = [];
   	 var standby = [];
   	 var diffs = [];
   	 dog.each(function(i, element){
   	 	var title = $(this).children('td').first();
   	 	if(title.text() !== '' && i > 4){
   	 		if(i < 359){ 		
		   	  	var artist = $(title).next();
		   	 	var diffNov = $(this).children('td[style="background:#aaaaff;"]').text().slice(0,-1).trim();
		   	 	var diffAdv = $(this).children('td[style="background:#ffffaa;"]').text().slice(0,-1).trim();
		   	 	var diffExh = $(this).children('td[style="background:#ffaaaa;"]').text().slice(0,-1).trim();
		   	 	var diffInf = $(this).children('td[style="background:#8cfece;"]').text().slice(0,-1).trim();
		   	 	if(diffNov !== '-' && diffNov !== ''){
			   	 	var newDocNov = {
			   	 		title: title.text().trim(),
			   	 		artist: artist.text().trim(),
			   	 		difficulty_cat: "NOV",
			   	 		difficulty_level: parseInt(diffNov),
			   	 		game: "sdvx2"
			   	 	};
			   	 	docs.push(newDocNov);
		   	 	}
		   	 	if(diffAdv !== '-' && diffAdv !== ''){
			   	 	var newDocAdv = {
			   	 		title: title.text().trim(),
			   	 		artist: artist.text().trim(),
			   	 		difficulty_cat: "ADV",
			   	 		difficulty_level: parseInt(diffAdv),
			   	 		game: "sdvx2"
			   	 	};
			   	 	docs.push(newDocAdv);
		   	 	}
		   	 	if(diffExh !== '-' && diffExh !== ''){
			   	 	var newDocExh = {
			   	 		title: title.text().trim(),
			   	 		artist: artist.text().trim(),
			   	 		difficulty_cat: "EXH",
			   	 		difficulty_level: parseInt(diffExh),
			   	 		game: "sdvx2"
			   	 	};
			   	 	docs.push(newDocExh);
		   	 	}
		   	 	if(diffInf !== '-' && diffInf !== ''){
		   	 		newDocInf = {
		   	 			title: title.text().trim(),
		   	 			artist: artist.text().trim(),
		   	 			difficulty_cat: "INF",
		   	 			difficulty_level: parseInt(diffInf),
		   	 			game: "sdvx2"
		   	 		}
		   	 		docs.push(newDocInf);
		   	 	}
	   	 	}
	   	 	else{
	   	 		if(i<404){
	   	 			// New INF charts
	   	 			// These do not have the artist name listed so we must find the artist in our db later.
	   	 			var game = $(title).next().text().trim();;
	   	 			var diffInf = $(this).children('td[style="background:#8cfece;"]').text().slice(0,-1).trim();
	   	 			if(game === 'SOUND VOLTEX BOOTH'){
	   	 				game = 'sdvx1';
	   	 			} else{ 
						game = 'sdvx2';	
	   	 			}	
	   	 			var newDoc = {
	   	 				title: title.text().trim(),
	   	 				game: game
	   	 			};
	   	 			var newDog = {
	   	 				difficulty_cat: "INF",
	   	 				difficulty_level: parseInt(diffInf),
	   	 			}
	   	 			standby.push(newDoc);
	   	 			diffs.push(newDog);
	   	 		}
	   	 		else{
	   	 			// Difficulty changes
	   	 		}
	   	 	}
   	 	}
   	});
	// console.log(docs);
	// console.log(standby);
	// Song.find().or(standby).then(function(results){
	// 	console.log(results);
	// });
    Song.collection.insert(docs, function(result){
	 	console.log('done');

    });
	}  	
  });
}

var fetcher3 = function(cb){
  // https://remywiki.com/SOUND_VOLTEX_III_GRAVITY_WARS#New_Songs
}


// fetcher1();
fetcher2();
// fetcher3();

exports.fetcher = fetcher;
exports.fetcher2 = fetcher2;
exports.fetcher3 = fetcher3;
