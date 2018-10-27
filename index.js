var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var { remove } = require('lodash');
var moment = require('moment');

var _events = {
  connect: function() {},
  init: function() {},
  disconnect: function() {}
};

var _clients = [];

var _app = express();
var _server = http.createServer(_app);
var _io = socketIO(_server);

function ServerSocket(port, events = {}, options = {}) {
  // check if port is set
  if (!port) {
    throw 'First variable is needed (port) !';
  }

  // assing event
  this.events = {};
  // spread operator legacy
  Object.assign(this.events, _events, events);

  var _port = port;
  Object.defineProperty(this, 'port', {
    get: function() {
      return _port;
    },
    set: function(port) {
      // change the private variable
      _port = port;
      // Start the server with this new port
      runServer(port);
    }
  });

  this.port = port;

  _io.on('connection', function(socket) {
    console.log('new coonect !');

    socket.on('disconnect', function() {
      console.log('disconnect !');
    });
  });

  return this;
}

/**
 * Stop the server
 */
ServerSocket.prototype.stop = function() {
  // run server without port, he will close himself
  runServer();
};

/**
 * Private method - run the server with a specific port
 * @param {number} port
 */
function runServer(port) {
  // check if server is running
  if (_server.address()) {
    // close if running
    _server.close();
  }
  if (port) {
    // start the server
    _server.listen(
      port,
      error => (error ? _logger.error(error) : console.log(`Socket server listening on port ${port}.`))
    );
  }
}

var test = new ServerSocket(3000);
