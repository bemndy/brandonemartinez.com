import React, { useEffect } from 'react';
import './Overlay.css';
import { preLoaderAnim } from '../Preloader/Preloader';

const Overlay = ({ onFinish }) => {
  useEffect(() => {
    preLoaderAnim().then(() => {
      onFinish?.(); // Notify parent when done
    });
  }, [onFinish]);

  return (
    <div className="preloader">
      <div className="preloader-symbol" />
    </div>
  );
};

export default Overlay;
