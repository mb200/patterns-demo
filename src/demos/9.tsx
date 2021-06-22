import React, { useState } from 'react';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

type Props = {
  on?: boolean;
  onToggle?: (newValue: boolean) => void;
};

function ControlPropsToggle(props: Props): React.ReactElement {
  const { on, onToggle } = props;
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

  return <Switch on={resolvedOn} onClick={() => toggle()} />;
}

function ControlPropsToggleDemo() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      {darkMode ? 'Dark mode is on' : 'Dark mode is off'}
      <hr />
      <ControlPropsToggle on={darkMode} onToggle={setDarkMode} />
      <hr />
      <ControlPropsToggle on={darkMode} onToggle={setDarkMode} />
    </div>
  );
}

export { ControlPropsToggleDemo as Demo };
