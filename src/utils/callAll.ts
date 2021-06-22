type Func<A extends unknown[], T> = (...args: A) => T;

function callAll<A extends unknown[], T>(...fns: Func<A, T>[]) {
  return function exec(...args: A) {
    return fns.forEach((fn) => fn && fn(...args));
  };
}

export { callAll };
