import React, { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';
import { Switch } from '../components/Switch';
import { useDarkMode } from '../hooks/useDarkMode';

type State = { on: boolean };
type Action = { type: 'toggle' };

const ToggleContext = createContext<[State, Dispatch<Action>]>([{ on: false }, (_action) => ({ on: false })]);

type Props = {
  initialState?: State;
  stateReducer?: React.Reducer<State, Action>;
};

// Default reducer (for uncontrolled components).
const defaultReducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case 'toggle':
      return { on: !prevState.on };
    default:
      return prevState;
  }
};

// Higher-Order functions
const toggle = (dispatch: Dispatch<Action>) => () => dispatch({ type: 'toggle' });

function ReducerProviderToggle(props: PropsWithChildren<Props>): React.ReactElement {
  const { initialState = { on: false }, stateReducer = defaultReducer, children } = props;
  const value = useReducer(stateReducer, initialState);

  return <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>;
}

function Nav() {
  const [state, dispatch] = useContext(ToggleContext);

  return (
    <div>
      <Switch on={state.on} onClick={() => toggle(dispatch)()} />
    </div>
  );
}

function Content() {
  const [state] = useContext(ToggleContext);

  return <>{state.on ? 'Dark mode is on' : 'Dark mode is off'}</>;
}

function Emoji() {
  const [state] = useContext(ToggleContext);

  return <>{state.on ? '🌙' : '🌞'}</>;
}

function ReducerProviderToggleDemo() {
  const [darkMode, setDarkMode] = useDarkMode();

  const stateReducer = (prevState: State, action: Action): State => {
    switch (action.type) {
      case 'toggle':
        // This probably isn't the best.
        setDarkMode(!prevState.on);
        return { on: !prevState.on };
      default:
        return prevState;
    }
  };

  return (
    <ReducerProviderToggle initialState={{ on: darkMode }} stateReducer={stateReducer}>
      <div>
        <Nav />
        <hr />
        <Content />
        <hr />
        <Emoji />
      </div>
    </ReducerProviderToggle>
  );
}

export { ReducerProviderToggleDemo as Demo };
