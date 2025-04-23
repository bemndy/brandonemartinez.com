import React from 'react'; 
import Overlay from './components/overlay/overlay'
import Navbar from './components/navbar/navbar';
import Hero from './pages/hero';
import About from './pages/about';
import Misc from './pages/misc';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Overlay/>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Hero/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/misc' element={<Misc/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
