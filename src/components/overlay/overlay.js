import React, { useEffect } from 'react';
import './overlay.css';
import { preLoaderAnim } from '../preloader/preloader';

const Overlay = ({ onFinish }) => {
  useEffect(() => {
    preLoaderAnim().then(() => {
      onFinish?.(); // Notify parent when done
    });
  }, [onFinish]);

  return (
    <div className="preloader">
      <div className="texts-container"><span>Think.</span></div>
      <div className="texts-container"><span>Design.</span></div>
      <div className="texts-container"><span>Develop.</span></div>
    </div>
  );
};

export default Overlay;
