var m = require('mithril')
var MyComponent = require('./components/MyComponent')
var image = require('./components/Image');

//
// Global variable for global state (e.g. currentUser)
//
window.App = {}

//
// Client-side routing
//
m.route.mode = 'pathname'
m.route(document.getElementById('app'), '/', {

  '/': {
    // Controllers are optional
    // controller: function () {},

    view: function (ctrl) {
      return m('.app', [
        m('h1', 'Node Catapult'),
        m.component(image, { src: './assets/Gorilla.png' })
      ]);
    }
  }

})
