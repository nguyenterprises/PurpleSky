import React, { useState, useEffect } from 'react'
import './cardsStyles.css';
import { humanTimeHour, humanTimeDayOfWeek, humanTimeMinute, timeLowerCase } from "../../functions/time";
import { weatherIcon, weatherAka } from "../../functions/weatherCodes";
import { sliceOfDay } from '../../functions/sliceOfDay';

function CardsSection ({ forecast, userDetails, temp, setTemp, indexValue, setIndexValue })  {

  const [sliceState, setSliceState] = useState({ start: 0, end: 22 });

  useEffect(() => {
    setSliceState({ start: 0, end: 22 });
  },[forecast, userDetails])

  return (
    <div id='card-box'>
      
      <div id='cc-top'>
        <div>
          <div className='cc-text'>
            <div>{forecast.daily && weatherAka(forecast.daily[indexValue].weatherCode)}</div>
            <div>{(!userDetails.city) ? userDetails.county : userDetails.city}, {userDetails.state}</div>
          </div>
          <div className='switch-degrees'>
            <div onClick={() => setTemp('C')}l >&deg;C</div>
            <div onClick={() => setTemp('F')} >&deg;F</div>
          </div>
        </div>
        <div>
          {forecast.hourly && <EveryThreeHoursCards forecast={forecast} sliceState={sliceState} indexValue={indexValue} />}
        </div>
        <div>
          {forecast.daily && <>
            <div>Sunrise: <span>{timeLowerCase(humanTimeMinute(forecast.daily[indexValue].sunrise, forecast.timeZone.timeZone))}</span></div>
            <div>Sunset: <span>{timeLowerCase(humanTimeMinute(forecast.daily[indexValue].sunset, forecast.timeZone.timeZone))}</span></div>
          </>}
        </div>
      </div>
      <div id='cc-bottom'>
        <div>{forecast.daily && <EveryDayCards forecast={forecast} sliceState={sliceState} setSliceState={setSliceState} indexValue={indexValue} setIndexValue={setIndexValue} />}</div>
      </div>

    </div>
  )
};
export default CardsSection

export const EveryThreeHoursCards = ({ forecast, sliceState, indexValue }) => {
    let propSliceState = forecast.hourly.slice(sliceState.start, sliceState.end);
    let propSunrise = forecast.daily.filter(rise => rise.humanDay == propSliceState[0].humanDay)[0].sunrise;
    let propSunset = forecast.daily.filter(set => set.humanDay == propSliceState[0].humanDay)[0].sunset;

    let everyThree = [];
    for (let i = 0; i < propSliceState.length; i+=3) {
      everyThree.push(propSliceState[i]);
    };
    return(
      <div className='f-card-row'>
        {everyThree.map((hour, index) =>  (
          <div className='f-card' key={hour.timestamp}>
            <div>{humanTimeHour(hour.timestamp, forecast.timeZone.timeZone)}</div>
            <div>
              <img src={weatherIcon(hour.weatherCode, hour.timestamp, propSunrise, propSunset)} alt='weather icon' /></div>
            <div>{hour.temperature}&deg;</div>
            <div className={hour.precipProbability < 1 ? 'precip-prob not-visible' : 'precip-prob'}>
              <img src='https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678640920/weather/raindrop_dkdqbe.svg' alt='raindrop' />
              <div>{hour.precipProbability}%</div>
            </div>
          </div>
        ))}
      </div>
    )
}

export const EveryDayCards = ({ forecast, sliceState, setSliceState, indexValue, setIndexValue }) => {
    let propSliceState = forecast.hourly.slice(sliceState.start, sliceState.end);
    let propSunrise = forecast.daily.filter(rise => rise.humanDay == propSliceState[0].humanDay)[0].sunrise;
    let propSunset = forecast.daily.filter(set => set.humanDay == propSliceState[0].humanDay)[0].sunset;

    useEffect(() => {
      if (indexValue === 0) { setSliceState({ start: 0, end: 22 })}
       else {
        const sd = sliceOfDay(forecast, indexValue)
        setSliceState({ start: sd.start + 2, end: sd.end + 1})
       }
    },[indexValue])

    return (
      <div className='f-card-row'>
        {forecast.daily.map((day, index) => (
          <div className='f-card g-border' key={day.timestamp} value={index} onClick={()=> setIndexValue(index)} >
            <div>{humanTimeDayOfWeek(day.timestamp, forecast.timeZone.timeZone)}</div>
            <div>
              <img src={weatherIcon(day.weatherCode, propSunrise, propSunrise, propSunset)} alt='weather icon' /></div>
            <div>{day.highTemp}&deg;</div>
            <div>{day.lowTemp}&deg;</div>
          </div>
        ))}
      </div>
    )
}