'use strict';
// module
var moment = require('moment');

// Private variable
var _logger;

/**
 * Personal module logger
 * @param {object} logger
 */
function Logger(logger = console.log) {
  _logger = logger;
  this.options = {};
  Object.defineProperties(this.options, {
    level: {
      value: 0,
      writable: true
    },
    active: {
      value: true,
      writable: true
    },
    info: {
      value: 1,
      writable: false
    },
    debug: {
      value: 0,
      writable: false
    }
  });
  return this;
}

/**
 * Set the desired debug level
 */
Logger.prototype.setLevel = function(level = 0) {
  this.options.level = level;
};

/**
 * Defined if the logger must be active
 */
Logger.prototype.active = function(active) {
  if (typeof active === 'boolean') {
    this.options.active = active;
  }
};

/**
 * Set the logger
 */
Logger.prototype.setLogger = function(logger) {
  if (logger) {
    _logger = logger;
  }
};

/**
 * Add a message with the level Info
 */
Logger.prototype.info = function(message) {
  if (this.options.level <= this.options.info && this.options.active) {
    sendMessage(getMessage('Info', message), 'info');
  }
};

/**
 * Add a message with the level Debug
 */
Logger.prototype.debug = function(message) {
  if (this.options.level <= this.options.debug && this.options.active) {
    sendMessage(getMessage('Debug', message), 'debug');
  }
};

/**
 * Add a message with the level Error
 */
Logger.prototype.error = function(message) {
  if (this.options.active) {
    sendMessage(getMessage('Error', message), 'error');
  }
};

/**
 * Message format
 * @param {string} message
 */
function getMessage(level, message) {
  return level + ' : ' + moment().format('DD/MM/YYYY - HH:mm:ss') + ' ' + message;
}

/**
 * Log a message
 * @param {string} message
 */
function sendMessage(message, action) {
  _logger[action] ? _logger[action](message) : _logger(message);
}

// One instance for the entire application
module.exports = new Logger();
