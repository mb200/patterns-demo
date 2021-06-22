import React, { createContext, PropsWithChildren, useState } from 'react';
import { useContext } from 'react';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

const ToggleContext = createContext({
  on: false,
  toggle: () => {},
});

type Props = {
  on?: boolean;
  onToggle?: (newValue: boolean) => void;
};

function ProviderToggle(props: PropsWithChildren<Props>): React.ReactElement {
  const { on, onToggle, children } = props;
  const [internalOn, setInternalOn] = useState(false);

  const isControlled = on !== undefined && !!onToggle;
  const resolvedOn = on ?? internalOn;

  const toggle = () => {
    if (isControlled) {
      onToggle?.(!on);
    } else {
      setInternalOn(!internalOn);
    }
  };

  return <ToggleContext.Provider value={{ on: resolvedOn, toggle }}>{children}</ToggleContext.Provider>;
}

function Nav() {
  const context = useContext(ToggleContext);

  return (
    <div>
      <Switch on={context.on} onClick={() => context.toggle()} />
    </div>
  );
}

function Content() {
  const context = useContext(ToggleContext);

  return <>{context.on ? 'Dark mode is on' : 'Dark mode is off'}</>;
}

function Emoji() {
  const context = useContext(ToggleContext);

  return <>{context.on ? '🌙' : '🌞'}</>;
}

function ControlPropsProviderToggleDemo() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <ProviderToggle on={darkMode} onToggle={setDarkMode}>
      <div>
        <Nav />
        <hr />
        <Content />
        <hr />
        <Emoji />
      </div>
    </ProviderToggle>
  );
}

export { ControlPropsProviderToggleDemo as Demo };
