'use strict';

var _logger = require('./logger');

// Création des variables privées
var _events = [];

function Events(events = []) {
  // Vérification de paramètre
  if (typeof events !== 'object' || !Array.isArray(events)) {
    throw 'La variable events doit être un tableau';
  }

  // Vérification des évenements
  for (let i = 0; i < events.length; i++) {
    if (!checkEvent(events[i])) {
      _logger.error('Un évenement doit être sous la forme {name: string, action: Function}');
      continue;
    }
    // Ajout dans la variable privée
    _events.push(events[i]);
  }
}

/**
 * Ajout d'un nouvelle évenement
 * @param {{name: string, action: Function}} event
 * @returns {number}
 */
Events.prototype.add = function(event) {
  // Vérification de l'évenement
  if (!checkEvent(event)) {
    _logger.error("L'évenement ajouté ne corresponds pas aux critères");
    return null;
  }
  // Ajout de l'évenement dans le tableau
  _events.push(event);
  // Retour de la place de l'évenement dans le tableau
  return _events.length - 1;
};

/**
 * Supprime un evenement
 */
Events.prototype.remove = function(index) {
  // Vérification du paramètre envoyé
  if (typeof index === 'number') {
    _logger.error('Imposible de supprimer un event');
    return null;
  }
  // suppression de l'évenement dans le tableau
  _event.splice(index, 1);
};

/**
 * Récuperation de tout les évenements
 */
Events.prototype.get = function() {
  return _events;
};

/**
 * Vérification de la conformité de l'object évenement
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
