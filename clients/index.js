'use strict';
var Client = require('./client');
var _logger = require('../logger');

// Private variable
var _clients = [];

/**
 * Customer Manager
 */
function Clients() {}

/**
 * Add a new client
 * @param {object} socket
 * @param {object} infos
 * @returns {string}
 */
Clients.prototype.add = function(socket, infos = {}) {
  // Socket verification
  if (!socket) {
    _logger.error('The socket is mandatory when adding a client!');
    return null;
  }
  // Checking the info variable
  if (typeof infos !== 'object') {
    _logger.error('The {infos} variable must be an object!');
    return null;
  }

  // Creating a new client
  var client = new Client(socket, infos, _clients);

  _logger.info('Creating a new client (' + client.id + ') !');

  // Add the client
  _clients.push(client);

  // Return of the customer's id
  return client.id;
};

Clients.prototype.update = function(id, infos) {
  // Checking the parameters
  if (typeof id !== 'string') {
    return _logger.error('The ID of a client must be a string');
  }
  if (typeof infos !== 'object') {
    return _logger.error('Customer info must be in the form of an object');
  }

  // Recovery of the customer's position
  var index = getPositionClient(id);

  // Verification of the client's presence
  if (index === null) {
    return _logger.error('No customers under this ID');
  }

  _logger.info('Changing a new customer (' + id + ') !');

  // Editing customer info
  _clients[index].infos = infos;
};

/**
 * remove a client
 * @param {number} id
 */
Clients.prototype.remove = function(id) {
  // Parameter verification
  if (!id) {
    throw 'Please pass an id to delete a customer';
  }

  // Recovery of the customer's position
  var index = getPositionClient(id);

  // Checking the presence of the customer in the table
  if (index === null) {
    throw 'No customers under this ID';
  }

  _logger.info('Deleting a customer (' + id + ') index : ' + index + ' !');
  // Deleting the client
  _clients.splice(index, 1);
};

/**
 * get a client
 * @param {number} id
 */
Clients.prototype.findOne = function(id) {
  // Parameter verification
  if (!id) {
    _logger.error('Please pass an id to find a customer');
    return null;
  }

  // Get customer
  var client = getClient(id);

  // Verification of the client's presence
  if (!client) {
    _logger.error('No customer has this ID (' + id + ')');
  }

  _logger.debug('Get customer (' + client.id + ') !');

  // Renvoi du client
  return client;
};

/**
 * get multiples clients
 * @param {number[]} ids
 */
Clients.prototype.findAll = function(ids = []) {
  // Parameter verification
  if (!ids) {
    _logger.error('Please pass ideas to find customers');
    return null;
  }

  if (typeof ids !== 'object' || !Array.isArray(ids)) {
    _logger.error('You must pass a table containing customer IDs');
    return null;
  }

  // Declaration of the return variable
  var clients = [];

  for (let i = 0; i < ids.length; i++) {
    // Verification of the variable
    if (typeof ids[i] === 'string') {
      _logger.error('You have to send a string to find a client');
      continue;
    }

    // Get customer
    var client = getClient(ids[i]);

    // Verification of the client's presence
    if (!client) {
      _logger.error('Aucun client ne corresponds à cet ID');
      continue;
    }

    _logger.debug('Récupération du client (' + client.id + ') !');

    // Adding the client in the return variable
    clients.push(client);
  }

  // Return of customers found
  return clients;
};

/**
 * check if id client exists
 * @param {number} id
 * @returns {boolean}
 */
Clients.prototype.exists = function(id) {
  return getClient(id) !== null;
};

/**
 * get private variable _clients
 */
Clients.prototype.get = function() {
  return _clients;
};

/**
 * set private variable _clients
 */
Clients.prototype.set = function(clients = []) {
  _clients = clients;
};

/**
 * Sending a customer's position in the table
 * @param {string} id
 * @returns {number}
 */
function getPositionClient(id) {
  for (let i = 0; i < _clients.length; i++) {
    if (_clients[i].id === id) {
      return i;
    }
  }
  return null;
}

/**
 * Sending a customer
 * @param {string} id
 * @returns {object} client
 */
function getClient(id) {
  for (let i = 0; i < _clients.length; i++) {
    if (_clients[i].id === id) {
      return _clients[i];
    }
  }
  return null;
}

module.exports = Clients;
