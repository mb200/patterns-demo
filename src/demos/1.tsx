import React, { useState } from 'react';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

function SimpleToggle(): React.ReactElement {
  const [darkMode, setDarkMode] = useDarkMode();
  const [on, setOn] = useState(darkMode);

  const handleToggle = () => {
    setOn((on) => {
      const newValue = !on;
      setDarkMode(newValue);
      return newValue;
    });
  };

  return <Switch on={on} onClick={() => handleToggle()} />;
}

function SimpleToggleDemo() {
  return <SimpleToggle />;
}

export { SimpleToggleDemo as Demo };
