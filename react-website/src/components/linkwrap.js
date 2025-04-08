import React from 'react'
import './linkwrap.css'
import { motion } from 'framer-motion'

export const FlipLink = ({ children, to }) => {
    return (
        <motion.div
        className='flip-container'
        initial='initial'
        whileHover='hovered'
        >
            <motion.div
            variants={{
                initial: { y: 0 },
                hovered: { y: '100%' }
            }}
            >
                {children} 
            </motion.div>
            <motion.div
            className='flip-container-b'
            variants={{
                initial: { y: '-100%' },
                hovered: { y: 0 }
            }}
            >
                {children} 
            </motion.div>
        </motion.div>
    );
};

