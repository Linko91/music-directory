function Cache(opts) {
  this.opts = opts || {};
  this.cache = {};
}

Cache.prototype.get = function(key) {
  var d = Date.now();
  if (this.cache[key] === undefined) {
    this.debug('failed to pull "' + key + '" from cache');
    return;
  }

  if (d > this.cache[key].invalid) {
    this.debug('key "' + key + '" expired at: ' + this.cache[key].invalid);
    delete this.cache[key];
    return;
  }

  this.debug('key "' + key + '" pulled from cache');
  return this.cache[key].value;
};

Cache.prototype.set = function(key, value, expires) {
  var invalid = Date.now() + (expires || 5*60*1000);
  this.cache[key] = {};
  this.cache[key].value = value;
  this.cache[key].invalid = invalid;
  return this.cache[key].invalid;
};

Cache.prototype.debug = function() {
  if (this.opts.debug) console.log.apply(console, arguments);
};