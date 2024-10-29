import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from './components/home/home';
import Nav from './components/nav/navbar';
import Header from './components/header/header';
import Pok from './components/pokedexlist/poke';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
        <Route path="/" element={<Home />} />
           
          <Route path="/fav" element={<Pok/>} />
        </Routes>
      </div>
    </Router>
  );
};


export default App
