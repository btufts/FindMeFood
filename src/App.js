import React from 'react';
import './App.css';
import Homepage from './Homepage';

/**
 * Returns the completed web application to be rendered by index.js
 */
function App() {
  return (
    <div className="App">
      <h1>Find Me Food!</h1>
      <Homepage/>
    </div>
  );
}

export default App;
