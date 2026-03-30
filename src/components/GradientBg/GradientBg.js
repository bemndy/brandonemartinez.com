import { useEffect } from 'react';

function GradientBg() {
    useEffect(() => {
        const interBubble = document.querySelector('.interactive');
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;
        let rafId;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            if (interBubble) {
                interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            rafId = requestAnimationFrame(move);
        }

        function handleMouseMove(event) {
            tgX = event.clientX;
            tgY = event.clientY;
        }

        window.addEventListener('mousemove', handleMouseMove);
        move();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        document.querySelectorAll('.g1, .g2, .g3').forEach(blob => {
            const duration = parseFloat(getComputedStyle(blob).animationDuration);
            blob.style.animationDelay = `-${(Math.random() * duration).toFixed(2)}s`;
        });
    }, []);

    return (
        <div className='gradient-bg'>
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="50" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className='gradient-container'>
                <div className='g1'></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className='g4'></div>
                <div className="g5"></div>
                <div className="interactive"></div>
            </div>
        </div>
    );
}

export default GradientBg;
