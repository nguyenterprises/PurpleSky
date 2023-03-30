import React, { useState, useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { getTimeZone } from '../functions/timeZone';
import { getForecastGeocoder } from '../functions/forecast/getForecast';
import useWidth from '../ui/useWidth';

function Geocoder({ setUserDetails, setForecast, setMapCoords, setNws, setAlerts, temp, setTemp, setDisableNav, setIndexValue }) {

    const width = useWidth();
    const geoContainer = useRef(null);
    const geocoder = useRef(null);
    const [geoData, setGeoData] = useState({ place_name: '', latitude: "", longitude: "" });
    const [timezone, setTimezone] = useState();


    useEffect(() => {
        if (geocoder.current) return;
        geocoder.current = new MapboxGeocoder({
            accessToken: import.meta.env.VITE_API_KEY,
            types: 'country, region, place, postcode, locality, neighborhood'
        });
        geocoder.current.addTo('#geocoder');
        
    },[])
    
    useEffect(() => {
        if (!geocoder.current) return;
        geocoder.current.on('result', (e) => {
            setGeoData({ place_name: e.result.place_name, latitude: e.result.center[1], longitude: e.result.center[0] });
            let placeArray = e.result.place_name.split(',');
            setUserDetails({  city: placeArray[0], county: placeArray[0], state: placeArray[1], country: placeArray[2] });
            setMapCoords({ latitude: e.result.center[1], longitude: e.result.center[0] });
            setDisableNav(true);
            setIndexValue(0);
        })
    },[])

    useEffect(() => {
        if (geoData.latitude && geoData.longitude) {
        setTimezone('');
        getTimeZone(geoData.latitude, geoData.longitude, setTimezone);
        }
    },[geoData])

    useEffect(() => {
        if (timezone){
        getForecastGeocoder({ geoData, timezone, setForecast, setNws, setAlerts, temp });
        }
    },[timezone, temp])

   

  return (
    <div>

        <div ref={geoContainer} id='geocoder'></div>

        <div>
            <div onClick={() => setTemp('C')}>&deg;C</div>
            <div onClick={() => setTemp('F')}>&deg;F</div>
        </div>
   
    </div>
  )
}

export default Geocoder