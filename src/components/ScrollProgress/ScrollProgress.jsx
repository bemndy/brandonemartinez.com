import { useContext, useEffect, useState } from 'react';
import { LenisContext } from '../../LenisContext';
import './ScrollProgress.css';

function getNativeProgress() {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    return scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
}

function ScrollProgress() {
    const lenis = useContext(LenisContext);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (lenis) {
            const onScroll = ({ scroll, limit }) => {
                setProgress(limit > 0 ? (scroll / limit) * 100 : 0);
            };
            lenis.on('scroll', onScroll);
            return () => lenis.off('scroll', onScroll);
        }

        const onScroll = () => setProgress(getNativeProgress());
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [lenis]);

    return (
        <div className="scroll-progress-track" aria-hidden="true">
            <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
        </div>
    );
}

export default ScrollProgress;
