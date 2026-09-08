import { DarkModeProvider } from './DarkModeContext';
import { LenisProvider } from './LenisContext'
import ScrollToTop from './ScrollToTop';
import SkipToContent from './components/SkipToContent/SkipToContent'
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

function AppContent() {
  const location = useLocation();
  const isNotFound = !KNOWN_ROUTES.includes(location.pathname);

  return (
    <LenisProvider>
        <SkipToContent/>
        <GradientBg/>
        <ScrollToTop/>
        <Overlay/>
        <Navbar/>
        <main id="main-content" tabIndex={-1}>
            <Routes>
                <Route path='/' element={<Hero/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/misc' element={<Misc/>} />
                <Route path='/music' element={<Music/>} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </main>
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
