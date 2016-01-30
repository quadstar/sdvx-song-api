var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
var fs = require('fs');
var request = require('request');
var mongoose = require('mongoose');
var db = require('./db.js');
var Song = require('./models.js');

var routes = express.Router()

routes.get('/app-bundle.js',
  browserify('./client/app.js'))


routes.get('/api', function(req, res){
  fs.readFile(__dirname + '/README.md', function(err, results){
    if(err){
      throw err;
    }
    else{
      res.set({'Content-Type': 'text/plain'});
      res.send(results);
    }
  });
});

routes.get('/api/songs*', function(req, res){
  var limit = req.query.limit;
  if(!limit){
    limit = 10;
  }
  delete req.query.limit;
  Song.find(req.query).limit(limit).then(function(songs){
      // songs = [] when no matches. 
      res.send(songs);
  });
});

routes.post('/api/songs', function(req, res){
  Song.find(req.body).then(function(results){
    if(!results.length){
      var newSong = new Song(req.body);
      console.log(newSong);
      newSong.save(function(err, result){
        if(err){
           throw err;
        }
        console.log(result);
        console.log(err);
        res.send(req.body);
      });
    }
    else{
      res.send('this song already exists');
    }
  });
});


//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))


if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  // Mount our main router
  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}
