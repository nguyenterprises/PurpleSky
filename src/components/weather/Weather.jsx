import React, { useState, useEffect } from 'react'
import Geocoder from '../Geocoder';
import Map from '../Map';
import './weatherStyles.css';
import OtherStats from '../OtherStats';
import CardsSection from '../cards/Cards';
import NWSAlerts from '../Alerts';
import { DailyHighLowBars, TopHourlyBar } from '../Bars';
import { navigatorGeolocation } from '../../functions/navigator';
import { TitleSection } from '../Titlle';
import { weatherTheme } from '../../functions/weatherCodes';
import useWidth from '../../ui/useWidth';
import ScrollUp from '../../ui/scroll/ScrollUp';

function Weather() {

  const [forecast, setForecast] = useState({});
  const [nws, setNws] = useState({});
  const [alerts, setAlerts] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [mapCoords, setMapCoords] = useState({ latitude: '', longitude: '' });
  const [mapToggle, setMapToggle] = useState(false);
  const [temp, setTemp] = useState('F');
  const [disableNav, setDisableNav] = useState(false);
  const [indexValue, setIndexValue] = useState(0);

  const width= useWidth();

  useEffect(() => {
    if (!disableNav) navigatorGeolocation({ setUserDetails, setForecast, setMapCoords, setNws, setAlerts, temp });
  },[temp, disableNav]);


  return (
    <div id='weather-container'>

      <Geocoder setUserDetails={setUserDetails} setForecast={setForecast} setMapCoords={setMapCoords} setNws={setNws} setAlerts={setAlerts} setTemp={setTemp} temp={temp} setDisableNav={setDisableNav} setIndexValue={setIndexValue} />

      {(forecast.current && forecast.daily && forecast.hourly) &&
        <>
          <OtherStats forecast={forecast} temp={temp} />

          <div>
              <div>{(!userDetails.city) ? userDetails.county : userDetails.city}, {userDetails.state} </div>   
              <TitleSection nws={nws} forecast={forecast} />
              <div><TopHourlyBar forecast={forecast} start={0} end={25} /></div>
              <NWSAlerts alerts={alerts} />
          </div>

          {width > 950 &&
            <div>
              <div>
                <CardsSection forecast={forecast} userDetails={userDetails} setTemp={setTemp} temp={temp} indexValue={indexValue} setIndexValue={setIndexValue} />
              </div>
            </div>
          }
       
        <button onClick={() => setMapToggle(!mapToggle)}>{(!mapToggle) ? 'Show Map' : 'Collapse Map'}</button>

        {mapToggle && <div><Map mapCoords={mapCoords} /></div>}
      
        <div><DailyHighLowBars forecast={forecast} /></div>

      </>
      }

      <div><ScrollUp /></div>

    </div>
  )
}

export default Weather