import React, { useEffect } from 'react';
import './Overlay.css';
import { preLoaderAnim } from '../preloader/Preloader';

const Overlay = ({ onFinish }) => {
  useEffect(() => {
    preLoaderAnim().then(() => {
      onFinish?.(); // Notify parent when done
    });
  }, [onFinish]);

  return (
    <div className="preloader">
      <div className="texts-container"><span>Building</span></div>
      <div className="texts-container"><span>.</span></div>
      <div className="texts-container"><span>.</span></div>
      <div className="texts-container"><span>.</span></div>
    </div>
  );
};

export default Overlay;
