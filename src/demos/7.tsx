import React, { useRef, useState } from 'react';
import { Button } from '../components/Button';
import { Switch } from '../components/Switch';
import { callAll } from '../utils/callAll';

type GetToggleProps = Pick<JSX.IntrinsicElements['button'], 'aria-label'>;
type TogglerProps = Pick<JSX.IntrinsicElements['button'], 'onClick' | 'aria-expanded' | 'aria-label'>;

type Props = {
  initialOn: boolean;
  onToggle: (val: boolean) => void;
  onReset: () => void;
  children: (props: {
    on: boolean;
    reset: () => void;
    getTogglerProps: (opts?: GetToggleProps) => TogglerProps;
  }) => React.ReactNode;
};

function RenderPropsInitialStateToggle(props: Props): React.ReactElement {
  const { children, onReset, onToggle } = props;
  const initialOn = useRef(props.initialOn);
  const [on, setOn] = useState(props.initialOn);

  const toggle = () => {
    const newValue = !on;
    // Call both internal State and the prop callback.
    callAll(setOn, onToggle)(newValue);
  };

  const reset = () => {
    callAll(setOn, onReset)(initialOn.current);
  };

  const getTogglerProps = (opts: GetToggleProps = {}): TogglerProps => ({
    ...opts,
    'aria-expanded': !!on,
    onClick: () => toggle(),
  });

  return <>{children({ on, reset, getTogglerProps })}</>;
}

function RenderPropsInitialStateToggleDemo() {
  return (
    <RenderPropsInitialStateToggle
      initialOn={false}
      onToggle={(...args) => console.log('toggle', ...args)}
      onReset={(...args) => console.log('reset', ...args)}
    >
      {({ on, reset, getTogglerProps }) => (
        <div>
          {on ? 'Some mode is on' : 'Some mode is off'}
          <hr />
          <Switch on={on} {...getTogglerProps()} />
          <hr />
          <Button aria-label="reset-button" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      )}
    </RenderPropsInitialStateToggle>
  );
}

export { RenderPropsInitialStateToggleDemo as Demo };
