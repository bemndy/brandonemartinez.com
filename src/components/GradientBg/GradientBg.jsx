import { useEffect, useRef } from 'react';

/**
 * How close, in pixels, the bubble has to get to the pointer before the
 * follow loop is considered finished. The easing below is asymptotic, so it
 * never actually arrives — without a cutoff the loop runs forever, repainting
 * a transform that rounds to the same integer every frame.
 */
const SETTLE_EPSILON = 0.5;

function GradientBg() {
    const containerRef = useRef(null);
    const bubbleRef = useRef(null);

    useEffect(() => {
        const interBubble = bubbleRef.current;
        if (!interBubble) return;

        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;
        let rafId = null;

        function move() {
            rafId = null;

            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;

            // Park the loop once the bubble has caught up. A later mousemove
            // sets a new target and starts it again, so this only ever pauses
            // between gestures — the idle state a visitor's cursor spends most
            // of its time in.
            const settled =
                Math.abs(tgX - curX) < SETTLE_EPSILON && Math.abs(tgY - curY) < SETTLE_EPSILON;
            if (!settled) schedule();
        }

        function schedule() {
            // A hidden tab gets no frames anyway; not scheduling is what stops
            // the browser from firing the whole backlog at once on return.
            if (rafId !== null || document.hidden) return;
            rafId = requestAnimationFrame(move);
        }

        function handleMouseMove(event) {
            tgX = event.clientX;
            tgY = event.clientY;
            schedule();
        }

        function handleVisibilityChange() {
            if (document.hidden) {
                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                return;
            }
            // The pointer may have moved elsewhere while the tab was away, so
            // pick the chase back up rather than assuming it settled.
            schedule();
        }

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        schedule();

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        // Scoped to this component's own container: '.g1'-'.g3' are generic
        // enough that a document-wide query would reach into anything else
        // that happens to use those names.
        const container = containerRef.current;
        if (!container) return;

        container.querySelectorAll('.g1, .g2, .g3').forEach(blob => {
            const duration = parseFloat(getComputedStyle(blob).animationDuration);
            blob.style.animationDelay = `-${(Math.random() * duration).toFixed(2)}s`;
        });
    }, []);

    return (
        <div className='gradient-bg' ref={containerRef}>
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
                <div className="interactive" ref={bubbleRef}></div>
            </div>
        </div>
    );
}

export default GradientBg;
