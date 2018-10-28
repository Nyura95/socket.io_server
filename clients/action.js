'use strict';

/**
 * Gestion des actions d'un client
 * @param {string} master
 * @param {Array} clients
 */
function Action(master, clients) {
  this.master = master;
  this.clients = clients;
}

/**
 * Envoi un évenement au client maitre
 * @param {number} id
 * @param {string} event
 * @param {any} message
 */
Action.prototype.sendMessageToMaster = function(event, message) {
  for (let i = 0; i < this.clients.length; i++) {
    if (this.clients[i].id === this.master) {
      this.clients[i].socket.emit(event, message);
    }
  }
};

/**
 * Envoi un message à un seul client ciblé par ID
 * @param {number} id
 * @param {string} event
 * @param {any} message
 */
Action.prototype.sendMessageToOne = function(id, event, message) {
  for (let i = 0; i < this.clients.length; i++) {
    if (this.clients[i].id === id) {
      this.clients[i].socket.emit(event, message);
    }
  }
};

/**
 * Envoi un message à tous les autres clients
 * @param {string} event
 * @param {any} message
 */
Action.prototype.sendMessageToOthers = function(event, message) {
  for (let i = 0; i < this.clients.length; i++) {
    if (this.clients[i].id !== this.master) {
      this.clients[i].socket.emit(event, message);
    }
  }
};

/**
 * Envoi un message à tous les autres clients
 * @param {string} event
 * @param {any} message
 */
Action.prototype.sendMessageToAll = function(event, message) {
  for (let i = 0; i < this.clients.length; i++) {
    this.clients[i].socket.emit(event, message);
  }
};

module.exports = Action;
