import React, { PropsWithChildren, useState } from 'react';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

function CompoundToggle(props: PropsWithChildren<{}>) {
  const { children } = props;

  const [darkMode, setDarkMode] = useDarkMode();
  const [on, setOn] = useState(darkMode);

  const handleToggle = () => {
    setOn((on) => {
      const newValue = !on;
      setDarkMode(newValue);
      return newValue;
    });
  };

  return (
    <React.Fragment>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          on,
          toggle: handleToggle,
        }),
      )}
    </React.Fragment>
  );
}

type Props = {
  on?: boolean;
  toggle?: () => void;
};

CompoundToggle.On = function On({ on, children }: PropsWithChildren<Props>) {
  return <>{on ? children : null}</>;
};
CompoundToggle.Off = function Off({ on, children }: PropsWithChildren<Props>) {
  return <>{!on ? children : null}</>;
};
CompoundToggle.Button = function Button({ on, toggle }: PropsWithChildren<Props>) {
  return <Switch on={!!on} onClick={() => toggle?.()} />;
};

function CompoundToggleDemo() {
  return (
    <CompoundToggle>
      <CompoundToggle.Button />
      <CompoundToggle.On>Dark mode is on</CompoundToggle.On>
      <CompoundToggle.Off>Dark mode is off</CompoundToggle.Off>
    </CompoundToggle>
  );
}

export { CompoundToggleDemo as Demo };
