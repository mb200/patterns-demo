import React, { useReducer, useRef } from 'react';
import { Button } from '../components/Button';
import { Switch } from '../components/Switch';

type State = { on: boolean };
type Action = { type: 'toggle'; payload: boolean } | { type: 'reset'; payload: boolean };
type GetToggleProps = Pick<JSX.IntrinsicElements['button'], 'aria-label'>;
type TogglerProps = Pick<JSX.IntrinsicElements['button'], 'onClick' | 'aria-expanded' | 'aria-label'>;

type Props = {
  initialOn: boolean;
  stateReducer: (prevState: State, action: Action) => State;
  children: (props: {
    on: boolean;
    reset: () => void;
    getTogglerProps: (opts?: GetToggleProps) => TogglerProps;
  }) => React.ReactNode;
};

function RenderPropsStateReducerToggle(props: Props): React.ReactElement {
  const { children, stateReducer } = props;
  const initialOn = useRef(props.initialOn);

  const [state, dispatch] = useReducer(stateReducer, { on: props.initialOn });

  const toggle = () => {
    const newValue = !state.on;
    dispatch({ type: 'toggle', payload: newValue });
  };

  const reset = () => {
    dispatch({ type: 'reset', payload: initialOn.current });
  };

  const getTogglerProps = (opts: GetToggleProps = {}): TogglerProps => ({
    ...opts,
    'aria-expanded': !!state.on,
    onClick: () => toggle(),
  });

  return <>{children({ on: state.on, reset, getTogglerProps })}</>;
}

function RenderPropsStateReducerToggleDemo() {
  const reducer = (prevState: State, action: Action): State => {
    switch (action.type) {
      case 'toggle':
        console.log('toggle', action.payload);
        return { on: action.payload };
      case 'reset':
        console.log('reset', action.payload);
        return { on: action.payload };
      default:
        return prevState;
    }
  };

  return (
    <RenderPropsStateReducerToggle initialOn={false} stateReducer={reducer}>
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
    </RenderPropsStateReducerToggle>
  );
}

export { RenderPropsStateReducerToggleDemo as Demo };
