import React from 'react'; 
import { LenisProvider } from './LenisContext'
import ScrollToTop from './ScrollToTop';
import Overlay from './components/overlay/overlay'
import Navbar from './components/navbar/navbar';
import Hero from './pages/hero';
import About from './pages/about';
import Misc from './pages/misc';
import StickyFooter from './components/footer/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <LenisProvider>
          <ScrollToTop/>
          <Overlay/>
          <Navbar/>
          <Routes>
              <Route path='/' element={<Hero/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/misc' element={<Misc/>} />
          </Routes>
          <StickyFooter/>
      </LenisProvider>
    </Router>
    </>
  );
}

export default App;
