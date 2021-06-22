import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

type Props = {
  children: (props: { on: boolean; toggle: () => void }) => React.ReactNode;
};

function RenderPropsToggle(props: Props): React.ReactElement {
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

  return <>{children({ on, toggle })}</>;
}

function RenderPropsToggleDemo() {
  return (
    <RenderPropsToggle>
      {({ on, toggle }) => (
        <div>
          {on ? 'Dark mode is on' : 'Dark mode is off'}
          <hr />
          <Switch on={on} onClick={toggle} />
          <hr />
          <Button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </Button>
        </div>
      )}
    </RenderPropsToggle>
  );
}

export { RenderPropsToggleDemo as Demo };
