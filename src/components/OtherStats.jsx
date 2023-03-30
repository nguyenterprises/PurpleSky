import React, { useState, useEffect } from 'react'
import { uvColor } from "../functions/uvColor";
import useWidth from "../ui/useWidth";
import useMeasure from 'react-use-measure';


const bold = { fontWeight: '600' };

function OtherStats ({ forecast, temp }) {
    const width = useWidth();
    let [ref, bounds] = useMeasure();
    const [scrolled, setScrolled] = useState(false);

    const metersToMiles = (meters) => {
      return Math.round(meters * 0.000621371192);
    }
    const metersToKilometers = (meters) => {
      return Math.round(meters / 1000);
    }
    const scrollRight = () => {
      const statsBar = document.getElementById('stats-bar');
      statsBar.scrollBy(100,0);
    }
    const scrollLeft = () => {
      const statsBar = document.getElementById('stats-bar');
      statsBar.scrollBy(-100,0);
    }
    useEffect(() => {
      window.addEventListener('scroll', () => {
          (window.scrollY > 5) ? setScrolled(true) : setScrolled(false);
      }, { capture: true, passive: true });
      return(() => {
          window.removeEventListener('scroll', () => {
              (window.scrollY > 5) ? setScrolled(true) : setScrolled(false);
          }, { capture: true, passive: true });
      });
    }, []);
    return (
      <div id='stats-bar'>
        <div>
          <div><span>Wind: </span>{forecast.hourly[0].windSpeed} {temp =='F' ? 'mph' : 'km/h'}</div>
          <div>
            <img src='https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678831286/weather/arrow_up_xe2zrl.svg' alt='wind direction' />
          </div>
        </div>
        <div><span>Humidity: </span>{forecast.hourly[0].humidity}%</div>
        <div><span>Dew Pt: </span>{forecast.hourly[0].dewpoint}&deg;</div>
        <div><span>UV Index: </span><span>{Math.round(forecast.daily[0].uvIndex)}</span></div>
        <div><span>Visibility: </span>{temp =='F' ? metersToMiles(forecast.hourly[0].visibility_meters/10) : metersToKilometers(forecast.hourly[0].visibility_meters/10)} {temp =='F' ? 'mi' : 'km'}</div>
        <div><span>Pressure: </span>{forecast.hourly[0].pressure} {temp =='F' ? 'mb' : 'hPa'}</div>
        {(width < 870 && !scrolled) && <>
          <button onClick={scrollRight}>
            <span>Scroll</span>
            <span>
              <img src="https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678831286/weather/arrow_up_xe2zrl.svg" alt="right-arrow" />
            </span>
          </button>
          <button onClick={scrollLeft}>
            <span>
              <img src="https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678831286/weather/arrow_up_xe2zrl.svg" alt="right-arrow" />
            </span>
            <span>Scroll</span>
          </button>
        </>}
      </div>
    )
};

export default OtherStats