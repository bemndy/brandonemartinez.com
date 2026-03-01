import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './likebutton.css';

function LikeButton() {
    const [count, setCount] = useState(null);
    const [liked, setLiked] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetch('/api/likes')
            .then(r => r.json())
            .then(data => setCount(data.count))
            .catch(() => setCount(0));

        const timer = setTimeout(() => setVisible(true), 60000);
        return () => clearTimeout(timer);
    }, []);

    const handleLike = async () => {
        if (liked) return;
        setLiked(true);
        try {
            const res = await fetch('/api/likes', { method: 'POST' });
            const data = await res.json();
            setCount(data.count);
        } catch {
            setCount(c => c + 1);
        }
        setTimeout(() => setVisible(false), 30000);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="like-wrapper"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <motion.button
                        className={`like-btn ${liked ? 'liked' : ''}`}
                        onClick={handleLike}
                        whileTap={!liked ? { scale: 0.78 } : {}}
                        animate={liked ? { scale: [1, 1.5, 0.88, 1.12, 1] } : { scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        aria-label="Like this site"
                    >
                        <svg viewBox="0 0 24 24" className="heart-icon" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </motion.button>
                    <AnimatePresence mode="wait">
                        {count !== null && (
                            <motion.span
                                key={count}
                                className="like-count"
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 0.6, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                {count.toLocaleString()}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LikeButton;
