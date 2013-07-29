

/**
 * Export the constructor
 */

module.exports = Ware;


/**
 * Create a middleware handler
 */

function Ware () {
  if (!(this instanceof Ware)) return new Ware();

  this.fns = [];
  this.errFn = function (err, input, output, next) { return next(); };
}


/**
 * Use a middleware function.
 *
 * @param {Function} fn  (input, output, next) or (err, input, output, next)
 */

Ware.prototype.use = function (fn) {
  if (fn.length === 4) this.errFn = fn;
  else this.fns.push(fn);
  return this;
};


/**
 * Return a function for input and callback
 */

Ware.prototype.end = function () {
  var fns   = this.fns
    , errFn = this.errFn;

  return function (input, callback) {
    iter(fns, errFn, input, callback);
  };
};


/**
 * Iterate over the middleware functions. Uses an object for the default output
 * or you can pass your own.
 */

function iter (fns, errFn, input, callback) {

  next(0, {});

  function next (index, output) {
    var fn = fns[index];
    if (!fn) return callback(null, output);

    fn(input, output, function (err, result) {
      if (err) return errFn(err, input, output, callback);
      next(index + 1, result || output);
    });
  }
}