/**
 * Module Dependencies
 */

var slice = [].slice;

/**
 * Load `co(fn)` on the server-side
 */

try {
  co = require('co');
} catch (e) {}

/**
 * Expose `Ware`.
 */

module.exports = Ware;

/**
 * Initialize a new `Ware` manager, with optional `fns`.
 *
 * @param {Function or Array or Ware} fn (optional)
 */

function Ware (fn) {
  if (!(this instanceof Ware)) return new Ware(fn);
  this.fns = [];
  if (fn) this.use(fn);
}

/**
 * Use a middleware `fn`.
 *
 * @param {Function or Array or Ware} fn
 * @return {Ware}
 */

Ware.prototype.use = function (fn) {
  if (fn instanceof Ware) {
    return this.use(fn.fns);
  }

  if (fn instanceof Array) {
    for (var i = 0, f; f = fn[i++];) this.use(f);
    return this;
  }

  this.fns.push(fn);
  return this;
};

/**
 * Run through the middleware with the given `args` and optional `callback`.
 *
 * @param {Mixed} args...
 * @param {Function} callback (optional)
 * @return {Ware}
 */

Ware.prototype.run = function () {
  var fns = this.fns;
  var ctx = this;
  var i = 0;
  var last = arguments[arguments.length - 1];
  var done = 'function' == typeof last && last;
  var args = done
    ? slice.call(arguments, 0, arguments.length - 1)
    : slice.call(arguments);

  // next step
  function next (err) {
    if (err) return done(err);
    var fn = fns[i++];
    var arr = slice.call(args);
    call(fn, arr);
  }

  // call
  function call(fn, args) {
    if (!fn) {
      // done
      return done && done.apply(done, [null].concat(args));
    } else if (fn.length > args.length) {
      // async
      fn.apply(ctx, args.concat(next));
    } else if (generator(fn)) {
      // generator
      co(fn).apply(ctx, args.concat(next));
    } else {
      // sync
      var ret = fn.apply(ctx, args);
      ret instanceof Error ? next(ret) : next();
    }
  }

  call(fns[i++], args);
  return this;
};

/**
 * Browser noop version of `co(fn)`
 *
 * @param {Function} fn
 * @return {Function}
 * @api private
 */

function co(fn) {
  return function() {
    return fn.apply(this, arguments);
  }
}

/**
 * Is `value` a generator?
 *
 * @param {Mixed} value
 * @return {Boolean}
 * @api private
 */

function generator(value) {
  return value
    && value.constructor
    && 'GeneratorFunction' == value.constructor.name;
}
