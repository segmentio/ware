
# ware

  Generic middleware to compose a series of functions with shared input and output

## Quickstart

```javascript

var ware = require('ware')();

ware.use(function (input, output, next) {
  output.x = input.x * 2;
  next();
});

ware.end({ x : 4 }, function (err, result) {
  console.log(result.x); // 8
});
```

## API

#### ware()

Create a new set of middleware.

#### .use(fn)

Adds a middleware function with the signature (input, output, next). Like express, if you add a function (err, input, output, next), this will act as the error handler.

```javascript
ware.use(function (input, output, next) {
  output.x = input.x * 2;
  next();
});
```

#### .end(input, fn)

Runs the middleware functions.

```javascript
ware.end(input, function (err, result) { /*...*/ });
```

## License

(The MIT License)

Copyright (c) 2013 Segment.io &lt;friends@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.