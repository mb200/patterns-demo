import React, { createContext, PropsWithChildren, useState } from 'react';
import { useContext } from 'react';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

const ToggleContext = createContext({
  on: false,
  toggle: () => {},
});

function CompoundContextToggle(props: PropsWithChildren<{}>) {
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

  return <ToggleContext.Provider value={{ on, toggle: handleToggle }}>{children}</ToggleContext.Provider>;
}

type Props = PropsWithChildren<{}>;

CompoundContextToggle.On = function On({ children }: Props) {
  const { on } = useContext(ToggleContext);

  return <>{on ? children : null}</>;
};

CompoundContextToggle.Off = function Off({ children }: Props) {
  const { on } = useContext(ToggleContext);

  return <>{!on ? children : null}</>;
};

CompoundContextToggle.Button = function Button() {
  const { on, toggle } = useContext(ToggleContext);

  return <Switch on={!!on} onClick={() => toggle()} />;
};

function CompoundContextToggleDemo() {
  return (
    <CompoundContextToggle>
      <CompoundContextToggle.Button />
      <CompoundContextToggle.On>Dark mode is on</CompoundContextToggle.On>
      <CompoundContextToggle.Off>Dark mode is off</CompoundContextToggle.Off>
    </CompoundContextToggle>
  );
}

export { CompoundContextToggleDemo as Demo };
