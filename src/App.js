import React from 'react';
import Canvas from './Canvas';
import './App.css'; // Assure-toi d'importer ton fichier CSS

const App = () => {
  return (
    <div>
      <h1>Snake Game</h1>
      <Canvas />
    </div>
  );
};

export default App;
