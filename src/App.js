import React from 'react'; 
import { LenisProvider } from './LenisContext'
import ScrollToTop from './ScrollToTop';
import Overlay from './components/overlay/overlay'
import Navbar from './components/navbar/navbar';
import Hero from './pages/hero';
import About from './pages/about';
import Music from './pages/music';
import Misc from './pages/misc';
import StickyFooter from './components/footer/footer'
import LikeButton from './components/likebutton/likebutton'
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
              <Route path='/music' element={<Music/>} />
          </Routes>
          <LikeButton/>
          <StickyFooter/>
      </LenisProvider>
    </Router>
    </>
  );
}

export default App;
