import React, { useState } from 'react'
import { returnBarBackground, returnGridContent } from "../functions/barCount";
import { humanTimeDayOfWeek, humanTimeHour, timeLowerCase } from "../functions/time";
import { weatherAka, weatherBarColor, weatherDailyBarIcon } from "../functions/weatherCodes";
import { colorOrTransparent } from '../functions/colorOrTransparent'
import { sliceOfDay } from '../functions/sliceOfDay';
import useWidth from '../ui/useWidth';


export const TopHourlyBar = ({ forecast, start, end }) => {
    const width = useWidth();
    let sliced = forecast.hourly.slice(start, end);
    let barData = [];
    for (let i = 0; i < sliced.length; i++) {
      let evod;
      (i % 2 === 0) ? evod = 'even' : evod = 'odd';
      barData.push({ time: humanTimeHour(sliced[i].timestamp, forecast.timeZone.timeZone), weatherAka: weatherAka(sliced[i].weatherCode), temperature: sliced[i].temperature, line: evod, barColor: weatherBarColor(sliced[i].weatherCode) });
    };
    const barBackground = returnBarBackground(barData);
    const barDescriptions = returnGridContent(barData);

    return(
      <div>
        <div>
          {barData.map((bd, key) => (
            <div key={key}>
              <div>
                <img src={(bd.line === 'even') ? 'https://res.cloudinary.com/dmjhwxcjh/image/upload/v1679903800/weather/line_short_black_debszy.svg' : 'https://res.cloudinary.com/dmjhwxcjh/image/upload/v1679903800/weather/line_long_black_c8sxuz.svg'} alt='line' />
              </div>
              <div>{timeLowerCase(bd.time)}</div>
              <div>{bd.temperature}&deg;</div>
            </div>
          ))}
        </div>
        <div>
          {barDescriptions.sequences.map((sq, key) => (
            <div key={key}>
              {sq.value}
            </div>
          ))}
        </div>
      </div>
    )
};

export const DailyHighLowBars = ({ forecast }) => {

  const daySlices = [
    { day: 1, start: 0, end: 25 },
    { day: 2, start: sliceOfDay(forecast, 1).start, end: sliceOfDay(forecast, 1).end + 2 },
    { day: 3, start: sliceOfDay(forecast, 2).start, end: sliceOfDay(forecast, 2).end + 2 },
    { day: 4, start: sliceOfDay(forecast, 3).start, end: sliceOfDay(forecast, 3).end + 2 },
    { day: 5, start: sliceOfDay(forecast, 4).start, end: sliceOfDay(forecast, 4).end + 2 },
    { day: 6, start: sliceOfDay(forecast, 5).start, end: sliceOfDay(forecast, 5).end + 2 },
    { day: 7, start: sliceOfDay(forecast, 6).start, end: sliceOfDay(forecast, 6).end + 2 },
    { day: 8, start: sliceOfDay(forecast, 7).start, end: sliceOfDay(forecast, 7).end + 2 },
  ];

  const dailyHighLowTemps =  forecast.daily.map((w, index) => {
      return { 
        highTemp: w.highTemp,
        lowTemp: w.lowTemp,
        timestamp: humanTimeDayOfWeek(w.timestamp, forecast.timeZone.timeZone),
        weatherCode: w.weatherCode,
        day: daySlices[index].day,
        start: daySlices[index].start,
        end: daySlices[index].end
      }
  })

  let weekHighTemps = forecast.daily.map(high => high.highTemp);
  const weekHigh = Math.max(...weekHighTemps)
  let weekLowTemps = forecast.daily.map(low => low.lowTemp);
  const weekLow = Math.min(...weekLowTemps)
  const findPostion = (num, high, low) => {
    let position = (num - low) / (high - low) * 100;
    return parseInt(position.toFixed(0))
  }
  const gtcPositions = (dailyHigh, dailyLow, weekHigh, weekLow) => {
    let low = findPostion(dailyLow, weekHigh, weekLow);
    let high = findPostion(dailyHigh, weekHigh, weekLow);
    let left = low + 4;
    let middle = (high - low) - 8;
    let right = (100 - high) + 4;
    const gtcPos = `${left}% ${middle}% ${right}%`;
    return gtcPos
  }

  const BarUnit = (props, key) => {
    
    const [barHour, setBarHour] = useState(false);

    return(
      
        <div key={key}>
          
            <div>
              <img src={weatherDailyBarIcon(props.daily.weatherCode)} alt='weather icon' />
              <span>{props.daily.timestamp}</span>
            </div>

            {!barHour &&
              <div>
                <div>{props.daily.lowTemp}&deg;</div>
                <div>{props.daily.highTemp}&deg;</div>
              </div>
            }

            <div onClick={()=> {setBarHour(prevValue => !prevValue);}} >
              <img src={(!barHour) ? 'https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678992805/weather/plus_icon_q9fm1t.svg' : 'https://res.cloudinary.com/dmjhwxcjh/image/upload/v1678992804/weather/minus_icon_p25snh.svg'} alt='hour-bar' />
            </div>
          
          {barHour &&
              <div>
                <TopHourlyBar forecast={forecast} start={props.daily.start} end={props.daily.end} />
              </div>
          }

        </div>
      
    )
  };

  return(
    <div>
        {dailyHighLowTemps.map((daily, key) => (
          <BarUnit key={key} daily={daily} />
        ))}
    </div>
  )

};

