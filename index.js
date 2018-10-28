'use strict';
/**
 * Gestionnaire du serveur io
 */

// Déclaration des modules
var http = require('http');
var socketIO = require('socket.io');

// Modules
var Clients = require('./clients/index');
var Events = require('./events');

// Création des variables privées
var _server = http.createServer();
var _io = socketIO(_server);
var _logger = require('./logger');
var _options = { logger: true, levelLogger: 0, personalLogger: console.log };

function Socket(port, events = [], options = _options) {
  // check if port is set
  if (!port || typeof port !== 'number') {
    throw 'Veuillez passer un port (nombre) pour demarrez un socket !';
  }

  // level du logger
  _logger.setLogger(options.personalLogger);
  _logger.active(options.logger);
  _logger.setLevel(options.levelLogger);

  var _port = 0;
  Object.defineProperty(this, 'port', {
    get: function() {
      return _port;
    },
    set: function(port) {
      if (typeof port !== 'number') {
        throw 'Le port doit être un nombre';
      }
      // Changement de la variable privé
      _port = port;
      // Demarrage du serveur sous le nouveau port
      runServer(_port);
    }
  });

  // assignation du port
  this.port = port;

  // Instanciation des clients
  this.clients = new Clients();

  // Instanciation des évenements
  this.events = new Events(events);

  var _this = this;

  setInterval(function() {
    _logger.debug('Nombre de client(s) connecté(s) : ' + _this.clients.get().length);
  }, 5000);

  // Evenement d'une connexion d'un nouveau client
  _io.on('connect', function(socket) {
    // Ajout d'un nouveau client et récuperation
    var client = _this.clients.findOne(_this.clients.add(socket));

    if (!client) {
      return;
    }

    // Récuperation des évenements
    var events = _this.events.get();

    // Ajout des évenemennts
    for (let i = 0; i < events.length; i++) {
      socket.on(events[i].name, function(message) {
        events[i].action(message, client);
      });
    }

    socket.on('disconnect', function() {
      // Suppression du client
      _this.clients.remove(client.id);
    });
  });
}

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
      error => (error ? _logger.error(error) : _logger.info(`Socket server listening on port ${port}.`))
    );
  }
}

module.exports = Socket;
