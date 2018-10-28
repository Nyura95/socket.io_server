'use strict';
var Client = require('./client');
var _logger = require('../logger');

// private variable
var _clients = [];

/**
 * Gestionnaire des clients
 */
function Clients() {}

/**
 * Add a new client
 * @param {object} socket
 * @param {object} infos
 * @returns {string}
 */
Clients.prototype.add = function(socket, infos = {}) {
  // Vérifaiction du socket
  if (!socket) {
    _logger.error("Le socket est obligatoire lors de l'ajout d'un client !");
    return null;
  }
  // Vérification de la variable infos
  if (typeof infos !== 'object') {
    _logger.error('La variable {infos} doit être un object !');
    return null;
  }

  // Création d'un nouveau client
  var client = new Client(socket, infos, _clients);

  _logger.info("Création d'un nouveau client (" + client.id + ') !');

  // Ajout du client
  _clients.push(client);

  // Retour de l'id du client
  return client.id;
};

Clients.prototype.update = function(id, infos) {
  // Vérification des paramètres
  if (typeof id !== 'string') {
    return _logger.error("l'ID d'un client doit être un string");
  }
  if (typeof infos !== 'object') {
    return _logger.error("Les infos du clients doivent être sous forme d'un object");
  }

  // Récuperation de la position du client
  var index = getPositionClient(id);

  // Vérification de la présence du client
  if (index === null) {
    return _logger.error('Aucun client sous cette ID');
  }

  _logger.info("Modification d'un nouveau client (" + id + ') !');

  // Modification des infos du client
  _clients[index].infos = infos;
};

/**
 * remove a client
 * @param {number} id
 */
Clients.prototype.remove = function(id) {
  // Vérifiaction de paramètre
  if (!id) {
    throw 'Veuillez passer un id pour supprimer un client';
  }

  // Récuperation de la position du client
  var index = getPositionClient(id);

  // Vérification de la présence du client dans le tableau
  if (index === null) {
    throw 'Aucun client sous cette ID';
  }

  _logger.info("Suppression d'un client (" + id + ') index : ' + index + ' !');
  // Suppression du client
  _clients.splice(index, 1);
};

/**
 * get a client
 * @param {number} id
 */
Clients.prototype.findOne = function(id) {
  // Vérifiaction de paramètre
  if (!id) {
    _logger.error('Veuillez passer un id pour trouver un client');
    return null;
  }

  // Récuperation du client
  var client = getClient(id);

  // Vérification de la présence du client
  if (!client) {
    _logger.error('Aucun client ne possède cet ID (' + id + ')');
  }

  _logger.debug('Récupération du client (' + client.id + ') !');

  // Renvoi du client
  return client;
};

/**
 * get multiples clients
 * @param {number[]} ids
 */
Clients.prototype.findAll = function(ids = []) {
  // Vérifiaction de paramètre
  if (!ids) {
    _logger.error('Veuillez passer des ids pour trouver les clients');
    return null;
  }

  if (typeof ids !== 'object' || !Array.isArray(ids)) {
    _logger.error('Vous devez passer un tableau contenant des ID clients');
    return null;
  }

  // Déclaration de la variable de retour
  var clients = [];

  for (let i = 0; i < ids.length; i++) {
    // Vérification de la variable
    if (typeof ids[i] === 'string') {
      _logger.error('Vous devez envoyer un string pour trouver un client');
      continue;
    }

    // Récuperation du cliennt
    var client = getClient(ids[i]);

    // Vérification de la présence du client
    if (!client) {
      _logger.error('Aucun client ne corresponds à cet ID');
      continue;
    }

    _logger.debug('Récupération du client (' + client.id + ') !');

    // Ajout du client dans la variable de retour
    clients.push(client);
  }

  // Retour des clients trouvés
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
 * Envoi la position d'un client dans le tableau
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
 * Envoi un client
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
