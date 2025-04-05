import React from 'react'; 
import Navbar from './components/navbar';
import HeroSection from './components/hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
          <Route path='/projects' element={<HeroSection/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
