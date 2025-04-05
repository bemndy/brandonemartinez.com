import React from 'react'; 
import Navbar from './components/navbar';
import Hero from './components/hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
          <Route path='/projects' element={<Hero/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
