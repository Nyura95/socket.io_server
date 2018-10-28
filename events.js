'use strict';

var _logger = require('./logger');

// Creating private variables
var _events = [];

function Events(events = []) {
  // Parameter check
  if (typeof events !== 'object' || !Array.isArray(events)) {
    throw 'The events variable must be an array';
  }

  // Checking of events
  for (let i = 0; i < events.length; i++) {
    if (!checkEvent(events[i])) {
      _logger.error('An event must be in the form {name: string, action: Function}');
      continue;
    }
    // Add to the private variable
    _events.push(events[i]);
  }
}

/**
 * Adding a new event
 * @param {{name: string, action: Function}} event
 * @returns {number}
 */
Events.prototype.add = function(event) {
  // Verification of the event
  if (!checkEvent(event)) {
    _logger.error('Event added does not match the criteria');
    return null;
  }
  // Adding the event in the table
  _events.push(event);
  // Return of the place of the event in the table
  return _events.length - 1;
};

/**
 * Delete an event
 */
Events.prototype.remove = function(index) {
  // Verification of the sent parameter
  if (typeof index === 'number') {
    _logger.error('Can not delete an event');
    return null;
  }
  // deleting the event in the table
  _event.splice(index, 1);
};

/**
 * Get of all events
 */
Events.prototype.get = function() {
  return _events;
};

/**
 * Verification of the conformity of the event object
 * @param {object} event
 * @return {boolean}
 */
function checkEvent(event) {
  if (typeof event !== 'object' || Array.isArray(event)) {
    return false;
  }

  if (!event.name || !event.action) {
    return false;
  }

  if (typeof event.name !== 'string' || typeof event.action !== 'function') {
    return false;
  }

  return true;
}

module.exports = Events;
