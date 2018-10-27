var isFunction = require('./helpers').isFunction;

/**
 * Gestionnaire du serveur io
 */

// private variable
var _io;

function Socket(io) {
  // assign the io server
  this.set(io);
}

/**
 * assign a new event
 * @param {string} event
 * @param {action} action
 */
Socket.prototype.newEvent = function(event, action) {
  if (typeof event === 'string' && isFunction(action)) {
    _io.on(event, action);
  }
};

/**
 * get private variable _io
 */
Socket.prototype.get = function() {
  return _io;
};

/**
 * set private variable _io
 */
Socket.prototype.set = function(io) {
  _io = io;
  _io.on('connection', socket => {
    console.log('New connect !');

    // socket.on('disconnect')
  });
};
