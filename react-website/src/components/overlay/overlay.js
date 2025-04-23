import React, { useEffect } from 'react'
import './overlay.css'
import preLoaderAnim from '../preloader/preloader'

export function Overlay() {
    useEffect(()=>{
        preLoaderAnim()
    },[]);

    return(
        <div className="preloader">
            <div className="texts-container">
            Think.
            </div>
            <div className="texts-container">
            Design.
            </div>
            <div className="texts-container">
            Develop.
            </div>
        </div>
    )
}

export default Overlay