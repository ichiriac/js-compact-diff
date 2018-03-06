# js-compact-diff
Javascript Diff representation between objects (in a compacted way)

## Overview

```js
import diff from 'js-compact-diff';

const a = {
  foo: 'bar',
  baz: [1, 2, 3],
  bar: true,
  fooBar: {
    baz: [2, 1],
    bazBar:  {
      bar: 'test'
    }
  }
};

const b = {
  bar: true,
  foo: 'baz',
  fooBar: {
    baz: [1, 2],
    bazBar:  {
      bar: 'test'
    }
  }
};
const c = diff.changes(a, b);
console.log(c);

/** WILL OUTPUT :
{
  _: ['baz'],
  foo: 'baz',
  fooBar: {
    baz: [1, 2]
  }
}
**/

// In order to rebuild B from A :
const bBis = diff.apply(a, c);
```

## API

- diff.changes : retrieves a list of changes between original and updated node
- diff.apply : apply changes over an original node

## License

MIT
