"use strict";

function blight(target, fns) {
  return new Proxy(target, {
    apply(obj, scope, args) {
      return fns.reduce((target, fn) => fn(target), obj).apply(scope, args);
    },

    get(obj, prop) {
      return blight(obj[prop], fns)
    }
  });
}

module.exports = blight;
