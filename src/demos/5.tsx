import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

type TogglerProps = Pick<JSX.IntrinsicElements['button'], 'onClick' | 'aria-expanded'>;

type Props = {
  children: (props: { on: boolean; getTogglerProps: () => TogglerProps }) => React.ReactNode;
};

function RenderPropsCollectionToggle(props: Props): React.ReactElement {
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

  const getTogglerProps = (): TogglerProps => ({
    'aria-expanded': !!on,
    onClick: () => toggle(),
  });

  return <>{children({ on, getTogglerProps })}</>;
}

function RenderPropsCollectionToggleDemo() {
  return (
    <RenderPropsCollectionToggle>
      {({ on, getTogglerProps }) => (
        <div>
          {on ? 'Dark mode is on' : 'Dark mode is off'}
          <hr />
          <Switch on={on} {...getTogglerProps()} />
          <hr />
          <Button aria-label="custom-button" {...getTogglerProps()}>
            {on ? 'on' : 'off'}
          </Button>
        </div>
      )}
    </RenderPropsCollectionToggle>
  );
}

export { RenderPropsCollectionToggleDemo as Demo };
