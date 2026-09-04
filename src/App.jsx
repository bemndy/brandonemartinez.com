import { useEffect } from 'react';
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
import NotFound from './pages/NotFound';
import StickyFooter from './components/Footer/Footer'
import LikeButton from './components/LikeButton/LikeButton'
import BackToTop from './components/BackToTop/BackToTop'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

const KNOWN_ROUTES = ['/', '/about', '/misc', '/music'];

const PAGE_TITLES = {
  '/': 'BEM.',
  '/about': 'About | BEM.',
  '/misc': 'Misc | BEM.',
  '/music': 'Music | BEM.',
};
const NOT_FOUND_TITLE = '404 | BEM.';

function AppContent() {
  const location = useLocation();
  const isNotFound = !KNOWN_ROUTES.includes(location.pathname);

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? NOT_FOUND_TITLE;
  }, [location.pathname]);

  return (
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
            <Route path='*' element={<NotFound/>} />
        </Routes>
        {!isNotFound && <LikeButton/>}
        {!isNotFound && <BackToTop/>}
        {!isNotFound && <StickyFooter/>}
    </LenisProvider>
  );
}

function App() {
  return (
    <DarkModeProvider>
    <Router>
      <AppContent/>
    </Router>
    </DarkModeProvider>
  );
}

export default App;
