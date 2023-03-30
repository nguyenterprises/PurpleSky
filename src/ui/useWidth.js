import { useState, useEffect } from 'react'

function useWidth() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const getWidth = () => {
        const w = window.innerWidth;
        setWindowWidth(w);
    }
    useEffect(() => {
        window.addEventListener('resize', getWidth);
        window.addEventListener('onload', getWidth);
        return(() => {
            window.removeEventListener('resize', getWidth);
            window.removeEventListener('onload', getWidth);
        })
    },[windowWidth])

  return windowWidth;
}

export default useWidth