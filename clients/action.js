'use strict';

/**
 * Management of a customer's actions
 * @param {string} master
 * @param {Array} clients
 */
function Action(master, clients) {
  this.master = master;
  this.clients = clients;
}

/**
 * Sending an event to the master client
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
 * Sending a message to only one customer targeted by ID
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
 * Send a message to all other customers
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
 * Send a message to all customers
 * @param {string} event
 * @param {any} message
 */
Action.prototype.sendMessageToAll = function(event, message) {
  for (let i = 0; i < this.clients.length; i++) {
    this.clients[i].socket.emit(event, message);
  }
};

module.exports = Action;
