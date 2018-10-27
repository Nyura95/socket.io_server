function Logger(level = 0) {
  this.options = {};
  Object.defineProperties(this.options, {
    level: {
      value: level
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

Logger.prototype.info = function(message) {
  if (this.options.level <= this.options.info) {
    console.log(message);
  }
};

Logger.prototype.debug = function(message) {
  if (this.options.level <= this.options.debug) {
    console.log(message);
  }
};

Logger.prototype.error = function(message) {
  console.log(message);
};

module.exports = Logger;
