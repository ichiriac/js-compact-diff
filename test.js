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
  z: false,
  y: -1
};

var c = diff.changes(a, b);
console.log(a);
console.log('---------------');
console.log(c);

var b2 = diff.apply(a, c);
console.log('---------------');
console.log(b2);
console.log('---------------');
console.log(b);
console.log('---------------');
console.log(diff.changes(b, b2));
