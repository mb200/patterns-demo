import React from 'react';
import { cx } from '../utils/cx';
import './Switch.scss';

type Props = {
  on: boolean;
  className?: string;
} & JSX.IntrinsicElements['button'];

function Switch(props: Props) {
  const { on, className = '', ...rest } = props;

  return (
    <div>
      <input
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={() => {
          // changing is handled by clicking the button
        }}
      />
      <button
        className={cx('toggle-btn', className, on ? 'toggle-btn-on' : 'toggle-btn-off')}
        aria-label="Toggle"
        {...rest}
      />
    </div>
  );
}

export { Switch };
