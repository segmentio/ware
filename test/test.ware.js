var should = require('should')
  , ware   = require('..');


describe('ware', function () {

  it('should be able to chain middleware appropriately', function (done) {
    var middleware = ware();

    middleware.use(function (inp, out, next) {
      out.x = inp.x * 2;
      next();
    });

    middleware.use(function (inp, out, next) {
      out.x = out.x + 20;
      next();
    });

    middleware.end({ x : 4 }, function (err, out) {
      out.x.should.eql(28);
      done();
    });
  });

  it('should properly add an error handler', function (done) {
    var middleware = ware();

    middleware
      .use(function (inp, out, next) { next(); })
      .use(function (err, inp, out, next) { next(err); })
      .use(function (inp, out, next) { next(new Error()); });

    middleware.end({ x : 4 }, function (err, out) {
      should.exist(err);
      err.should.be.instanceOf(Error);
      done();
    });
  });
});