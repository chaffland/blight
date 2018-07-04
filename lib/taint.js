"use strict";

function taint(target, fns) {
  return new Proxy(target, {
    apply(obj, scope, args) {
      return fns.reduce((target, fn) => fn(target), obj).apply(scope, args);
    },

    get(obj, prop) {
      return taint(obj[prop], fns)
    }
  });
}

module.exports = taint;
