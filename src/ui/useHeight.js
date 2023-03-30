import { useState, useEffect } from 'react'

function useHeight() {

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const getHeight = () => {
        const h = window.innerHeight;
        setWindowHeight(h);
    }
    useEffect(() => {
        window.addEventListener('resize', getHeight);
        window.addEventListener('onload', getHeight);
        return(() => {
            window.removeEventListener('resize', getHeight);
            window.removeEventListener('onload', getHeight);
        })
    },[windowHeight])

  return windowHeight;
}

export default useHeight