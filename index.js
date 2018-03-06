module.exports = {
  changes: function(a, b) {
    var result = {};
    for(var k in a) {
      if (a.hasOwnProperty(k)) {
        // scan properties to be deleted
        if (!b.hasOwnProperty(k)) {
          if (!result._) result._ = [];
          result._.push(k);
        } else if (a[k] !== b[k]) {
          // get changes
          if (typeof a[k] === 'object' || Array.isArray(a[k])) {
            if (typeof b[k] === 'object' || Array.isArray(b[k])) {
              let c = module.exports.changes(a[k], b[k]);
              if (c) {
                result[k] = c;
              }
            } else {
              result[k] = b[k];
            }
          } else {
            result[k] = b[k];
          }
        }
      }
    }
    for(var k in b) {
      if (b.hasOwnProperty(k)) {
        if (!a.hasOwnProperty(k)) {
          // appends additions
          result[k] = b[k];
        }
      }
    }
    if (Object.keys(result).length === 0) {
      // no change
      return null;
    }
    if (Array.isArray(b)) {
      result.__ = 'a';
    }
    return result;
  },
  apply: function(a, c) {
    var result = c.__ && c.__ === 'a' ? [] : {};
    for(var k in a) {
      if (a.hasOwnProperty(k)) {
        if (c._ && c._.indexOf(k) > -1) {
          // ignore property because deleted
          continue;
        }
        if (c.hasOwnProperty(k)) {
          // detect changes
          if (typeof a[k] === 'object' || Array.isArray(a[k])) {
            if (typeof c[k] === 'object') {
              result[k] = module.exports.apply(a[k], c[k]);
            } else {
              // destination is a primitive
              result[k] = c[k];
            }
          } else {
            if (c[k].__ === 'a') {
              // rebuilds the array
              result[k] = [];
              for(var i in c[k]) {
                if (i !== '_' && i !== '__') {
                  result[k][i] = c[k][i];
                }
              }
            } else {
              result[k] = c[k];
            }
          }
        } else {
          // exactly the same
          result[k] = a[k];
        }
      }
    }
    return result;
  }
}