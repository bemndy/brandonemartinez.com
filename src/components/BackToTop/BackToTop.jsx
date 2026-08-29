import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LenisContext } from '../../LenisContext';
import './BackToTop.css';

function BackToTop() {
    const lenis = useContext(LenisContext);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const threshold = Math.min(window.innerHeight * 0.75, maxScroll * 0.5);
            setVisible(maxScroll > 0 && window.scrollY > threshold);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    className="back-to-top-btn"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    aria-label="Back to top"
                >
                    <svg viewBox="0 0 24 24" className="back-to-top-icon" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 19V5M4 11l8-8 8 8" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export default BackToTop;
