import { DarkModeProvider } from './DarkModeContext';
import { LenisProvider } from './LenisContext'
import ScrollToTop from './ScrollToTop';
import Overlay from './components/Overlay/Overlay'
import Navbar from './components/Navbar/Navbar';
import GradientBg from './components/GradientBg/GradientBg';
import Hero from './pages/Hero';
import About from './pages/About';
import Music from './pages/Music';
import Misc from './pages/Misc';
import StickyFooter from './components/Footer/Footer'
import LikeButton from './components/LikeButton/LikeButton'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <DarkModeProvider>
    <Router>
      <LenisProvider>
          <GradientBg/>
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
    </DarkModeProvider>
  );
}

export default App;
