import React, { useState, useEffect } from 'react'
import './scrollupStyles.css';
import useWidth from '../useWidth';

function ScrollUp() {

    const width = useWidth();
    const [showTopBtn, setShowTopBtn] = useState(false);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            (window.scrollY > 400) ? setShowTopBtn(true) : setShowTopBtn(false);
        }, { capture: true, passive: true });
        return(() => {
            window.removeEventListener('scroll', () => {
                (window.scrollY > 400) ? setShowTopBtn(true) : setShowTopBtn(false);
            }, { capture: true, passive: true });
        });
    }, []);

  return (
    <>
    {showTopBtn && (
        <div id='su-circle' style={{
            width: (width < 800) ? '30px' : '50px',
            height: (width < 800) ? '30px' : '50px'
        }}>
            <div id='su-pos'>
                <div id='su-ic'>
                    <img
                        src='https://res.cloudinary.com/dmjhwxcjh/image/upload/v1674698108/hn_icons/arrowRight_rmbppp.svg'
                        alt='arrow-up'
                        id='scroll-up-image'
                        style={{ transform: 'rotate(-90deg)' }}
                        onClick={goToTop}
                    />
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default ScrollUp