import React from 'react'
import { weatherIcon, weatherAka } from "../functions/weatherCodes";


export const TitleSection = ({ forecast, nws }) => {

    return (
        <div>

            <div>
                <img src={weatherIcon(forecast.current.weatherCode, forecast.current.currentTime, forecast.daily[0].sunrise, forecast.daily[0].sunset)} alt='weather icon' />
                <span>{forecast.current.currentTemp}&deg;</span>
                <span>{(nws.shortForecast) ? nws.shortForecast : weatherAka(forecast.current.weatherCode)}.</span>
            </div>
            {nws.detailedForecast && <div>{nws.detailedForecast}.</div>}
        
        </div>

    )

};

