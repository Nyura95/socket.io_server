/**
 * check if variable is a function
 * @param {Function} functionToCheck
 * @returns {boolean}
 */
exports.isFunction = function(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};
