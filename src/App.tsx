import React from 'react';
import './App.scss';
import { Demo } from './demos/1';
// import { Demo } from './demos/2';
// import { Demo } from './demos/3';
// import { Demo } from './demos/4';
// import { Demo } from './demos/5';
// import { Demo } from './demos/6';
// import { Demo } from './demos/7';
// import { Demo } from './demos/8';
// import { Demo } from './demos/9';
// import { Demo } from './demos/10';
// import { Demo } from './demos/11';

function App() {
  return (
    <div className="app">
      <header className="app-demos">
        <Demo />
      </header>
    </div>
  );
}

export default App;
