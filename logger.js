'use strict';
// module
var moment = require('moment');

// Variable privée
var _logger;

/**
 * Logger personnelle du module
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
 * Défini le niveau de debug voulu
 */
Logger.prototype.setLevel = function(level = 0) {
  this.options.level = level;
};

/**
 * Défini si le logger doit être actif
 */
Logger.prototype.active = function(active) {
  if (typeof active === 'boolean') {
    this.options.active = active;
  }
};

/**
 * Défini le logger
 */
Logger.prototype.setLogger = function(logger) {
  if (logger) {
    _logger = logger;
  }
};

/**
 * Ajoute un message avec le level Info
 */
Logger.prototype.info = function(message) {
  if (this.options.level <= this.options.info && this.options.active) {
    sendMessage(getMessage('Info', message));
  }
};

/**
 * Ajoute un message avec le level Debug
 */
Logger.prototype.debug = function(message) {
  if (this.options.level <= this.options.debug && this.options.active) {
    sendMessage(getMessage('Debug', message));
  }
};

/**
 * Ajoute un message avec le level Erreur
 */
Logger.prototype.error = function(message) {
  if (this.options.active) {
    sendMessage(getMessage('Error', message));
  }
};

/**
 * Format du message
 * @param {string} message
 */
function getMessage(level, message) {
  return level + ' : ' + moment().format('DD/MM/YYYY - HH:mm:ss') + ' ' + message;
}

/**
 * Log un message
 * @param {string} message
 */
function sendMessage(message) {
  _logger(message);
}

// Une seule instance pour toute l'application
module.exports = new Logger();
