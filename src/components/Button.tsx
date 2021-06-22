import React from 'react';
import { cx } from '../utils/cx';
import './Button.scss';

type Props = JSX.IntrinsicElements['button'];

function Button(props: Props) {
  const { className, ...rest } = props;

  return <button className={cx('button', className)} {...rest} />;
}

export { Button };
