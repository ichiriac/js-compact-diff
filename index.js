var api = {
  changes: function(a, b, clone) {
    if (a === null || typeof a === 'undefined') {
      a = {};
    }
    if (b === null || typeof b === 'undefined') {
      b = {};
    }
    var result = {};
    for(var k in a) {
      if (a.hasOwnProperty(k)) {
        // scan properties to be deleted
        if (!b.hasOwnProperty(k)) {
          if (!result._) result._ = [];
          result._.push(k);
        } else if (a[k] !== b[k]) {
          if (b[k] === null) {
            // removes the entry
            result[k] = null;
          } else if (typeof a[k] === 'object' || Array.isArray(a[k])) {
            // get changes
            if (typeof b[k] === 'object' || Array.isArray(b[k])) {
              var c = api.changes(a[k], b[k]);
              if (c) {
                result[k] = c;
              }
            } else {
              result[k] = b[k]; // api.changes({}, b[k], true);
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
          if (b[k] !== null && (typeof b[k] === 'object' || Array.isArray(b[k]))) {
            result[k] = api.changes({}, b[k], true);
          } else {
            result[k] = b[k];
          }
        }
      }
    }
    if (Object.keys(result).length === 0 && !clone) {
      // no change
      return null;
    }
    if (Array.isArray(b)) {
      result.__ = 'a';
    }
    return result;
  },
  /**
   * Converts an object to primitive object
   */
  convert: function(a) {
    if (a === null || typeof a === 'undefined') {
      return a;
    }
    var result = a;
    if (typeof a === 'object') {
      if (Array.isArray(a)) {
        result = [];
      } else {
        result = a.__ && a.__ === 'a' ? [] : {};
      }
      for(var k in a) {
        if (k !== '_' && k != '__') {
          result[k] = this.convert(a[k]);
        }
      }
    }
    return result;
  },
  apply: function(a, c) {
    if (c === null || typeof c === 'undefined') {
      return this.convert(a);
    }
    var result = this.convert(c);
    if (a === null || typeof a === 'undefined') {
      a = {};
    } else if (a) {
      for(var k in a) {
        if (a.hasOwnProperty(k)) {
          if (c._ && c._.indexOf(k) > -1) {
            // ignore property because deleted
            continue;
          }
          if (c.hasOwnProperty(k)) {
            // detect changes
            if (typeof a[k] === 'object' || Array.isArray(a[k])) {
              if (c[k] !== null && typeof c[k] === 'object') {
                result[k] = api.apply(a[k], c[k]);
              } else {
                // destination is a primitive
                result[k] = c[k];
              }
            } else {
              if (c[k] && c[k].__ === 'a') {
                // rebuilds the array
                result[k] = [];
                for(var i in c[k]) {
                  if (i !== '_' && i !== '__') {
                    result[k][i] = this.convert(c[k][i]);
                  }
                }
              } else {
                result[k] = c[k];
              }
            }
          } else {
            // exactly the same
            result[k] = this.convert(a[k]);
          }
        }
      }
    }
    // appends missing keys
    for(var k in c) {
      if (k !== '_' && k !== '__' && c.hasOwnProperty(k)) {
        if (!a.hasOwnProperty(k)) {
          result[k] = this.convert(c[k]);
        }
      }
    }
    return result;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
} else {
  window.jsCompactDiff = api;
}
