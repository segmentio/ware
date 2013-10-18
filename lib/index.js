
/**
 * Expose `Ware`.
 */

module.exports = Ware;


/**
 * Initialize a new `Ware` manager.
 */

function Ware () {
  if (!(this instanceof Ware)) return new Ware();
  this.fns = [];
  this.errFn = function (err, input, output, next) { return next(); };
}


/**
 * Use a middleware `fn`.
 *
 * @param {Function} fn
 */

Ware.prototype.use = function (fn) {
  if (fn.length === 4) this.errFn = fn;
  else this.fns.push(fn);
  return this;
};


/**
 * Kick off the middleware with the given `input`.
 *
 * @param {Mixed} input
 * @param {Function} callback
 */

Ware.prototype.end = function (input, callback) {
  var fns = this.fns;
  var errFn = this.errFn;
  return next(0, {});

  function next (index, output) {
    var fn = fns[index];
    if (!fn) return callback(null, output);
    fn(input, output, function (err, result) {
      if (err) return errFn(err, input, output, callback);
      next(index + 1, result || output);
    });
  }
};
