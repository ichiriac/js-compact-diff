var diff = require('./index');

var a = {
  foo: 'bar',
  baz: [1, 2, 3],
  bar: true,
  fooBar: {
    baz: [2, 1, 3, 4],
    bazBar:  {
      bar: 'test'
    }
  },
  x: {foo: true},
  z: [1, 2, 3]
};

var b = {
  bar: true,
  foo: 'baz',
  fooBar: {
    baz: [1, 1, 3],
    bazBar:  {
      bar: 'test'
    }
  },
  x: null,
  z: false,
  y: -1
};

diff.changes(null, b);
diff.changes(a, null);
var c = diff.changes(a, b);
console.log(a);
console.log('---------------');
console.log(c);

diff.apply(null, c);
diff.apply(a, null);
var b2 = diff.apply(a, c);
console.log('---------------');
console.log(b2);
console.log('---------------');
console.log(b);
console.log('---------------');
console.log(diff.changes(b, b2));
