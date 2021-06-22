import { callAll } from './callAll';

afterEach(() => {
  jest.clearAllMocks();
});

test('passes args to all given functions', () => {
  const fun1 = jest.fn();
  const fun2 = jest.fn();
  const fun3 = jest.fn();

  callAll(fun1, fun2, fun3)({ closed: true }, 1);

  expect(fun1).toHaveBeenCalledWith({ closed: true }, 1);
  expect(fun2).toHaveBeenCalledWith({ closed: true }, 1);
  expect(fun3).toHaveBeenCalledWith({ closed: true }, 1);
});
