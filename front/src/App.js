import React from 'react';
import './App.css';

//importing components
import Header from './components/Header';
import Pageone from './components/Pageone';

function App() {
  return (
    <div className="App">
      <Header />
      <div id="pageOne">
        <Pageone />
      </div>
    </div>
  );
}

export default App;
