import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

type GetToggleProps = Pick<JSX.IntrinsicElements['button'], 'aria-label'>;
type TogglerProps = Pick<JSX.IntrinsicElements['button'], 'onClick' | 'aria-expanded' | 'aria-label'>;

type Props = {
  children: (props: { on: boolean; getTogglerProps: (opts?: GetToggleProps) => TogglerProps }) => React.ReactNode;
};

function RenderPropsCollectionGetterToggle(props: Props): React.ReactElement {
  const { children } = props;
  const [darkMode, setDarkMode] = useDarkMode();
  const [on, setOn] = useState(darkMode);

  const toggle = () => {
    setOn((on) => {
      const newValue = !on;
      setDarkMode(newValue);
      return newValue;
    });
  };

  const getTogglerProps = (opts: GetToggleProps = {}): TogglerProps => ({
    ...opts,
    'aria-expanded': !!on,
    onClick: () => toggle(),
  });

  return <>{children({ on, getTogglerProps })}</>;
}

function RenderPropsCollectionGetterToggleDemo() {
  return (
    <RenderPropsCollectionGetterToggle>
      {({ on, getTogglerProps }) => (
        <div>
          {on ? 'Dark mode is on' : 'Dark mode is off'}
          <hr />
          <Switch on={on} {...getTogglerProps()} />
          <hr />
          <Button {...getTogglerProps({ 'aria-label': 'custom-button' })}>{on ? 'on' : 'off'}</Button>
        </div>
      )}
    </RenderPropsCollectionGetterToggle>
  );
}

export { RenderPropsCollectionGetterToggleDemo as Demo };
