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
  z: [1, 2, 3],
  f: [undefined, null, 0]
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
  zap: null,
  y: -1,
  undef: undefined,
  f: [undefined, null, 0]
};

diff.changes(null, b);
diff.changes(a, null);
var c = diff.changes(a, b);
console.log('A = ', a);
console.log('---------------');
console.log('DIFF A-B => C : ', c);

diff.apply(null, c);
diff.apply(a, null);
var b2 = diff.apply(a, c);
console.log('---------------');
console.log('DIFF A+C => B : ', b2);
console.log('---------------');
console.log('B', b);
console.log('---------------');
console.log('DIFF B-B => 0 : ');
console.log(diff.changes(b, b2));
