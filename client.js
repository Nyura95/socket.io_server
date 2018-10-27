/**
 * Gestionnaire des clients du socket
 */

// private variable
var _clients;

// Instance Client
function Client(init = []) {
  if (typeof init !== 'object' && !Array.isArray(init)) {
    throw 'please, pass a array for initiate the clients';
  }
  // init client
  this.set(init);
}

/**
 * Add a new client
 * @param {number} id
 * @param {object} client
 */
Client.prototype.add = function(id, client) {};

/**
 * remove a client
 * @param {number} id
 */
Client.prototype.remove = function(id) {};

/**
 * get a client
 * @param {number} id
 */
Client.prototype.findOne = function(id) {};

/**
 * get multiples clients
 * @param {number[]} ids
 */
Client.prototype.findAll = function(ids = []) {};

/**
 * check if id client exists
 * @param {number} id
 * @returns {boolean}
 */
Client.prototype.exists = function(id) {};

/**
 * get private variable _clients
 */
Client.prototype.get = function() {
  return _clients;
};

/**
 * set private variable _clients
 */
Client.prototype.set = function(clients = []) {
  _clients = clients;
};
