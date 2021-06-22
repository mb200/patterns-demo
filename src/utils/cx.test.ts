import { cx } from './cx';

test('concatenates inputs to a single className', () => {
  expect(cx('test', { open: true, closed: false })).toEqual('test open');
  expect(cx('test', 'testing', { open: true, closed: false })).toEqual('test testing open');
  expect(cx('test', false ? 'not' : undefined)).toEqual('test');
});
