import { DarkModeProvider } from './DarkModeContext';
import { LenisProvider } from './LenisContext'
import ScrollToTop from './ScrollToTop';
import Overlay from './components/overlay/Overlay'
import Navbar from './components/navbar/Navbar';
import GradientBg from './components/gradientbg/GradientBg';
import Hero from './pages/Hero';
import About from './pages/About';
import Music from './pages/Music';
import Misc from './pages/Misc';
import StickyFooter from './components/footer/Footer'
import LikeButton from './components/likebutton/LikeButton'
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
