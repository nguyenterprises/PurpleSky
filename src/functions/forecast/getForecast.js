import axios from "axios";
import { defaultCoords } from "../defaults";
import { extractForecastWeatherData } from "./extract";
import { isoToHumanTime } from "../time";

export const getForecastNavigator = async ({ coords, setForecast, setNws, setAlerts, temp }) => {
    
    let nLatitude = (!coords) ? defaultCoords.latitude : coords.latitude;
    let nLongitude = (!coords) ? defaultCoords.longitude : coords.longitude;

    let timezone  = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const nTimeZone = (!coords) ? defaultCoords.timeZone : timezone;
   
    getWeatherNWS(nLatitude, nLongitude, setNws);
    getNWSAlerts(nLatitude, nLongitude, setAlerts, nTimeZone)

    await axios
    .get((temp == 'F') ?
        "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weathercode,visibility,winddirection_10m,windspeed_10m,windgusts_10m,dewpoint_2m,pressure_msl&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&forecast_days=8"
        :
        "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weathercode,visibility,winddirection_10m,windspeed_10m,windgusts_10m,dewpoint_2m,pressure_msl&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&timeformat=unixtime&forecast_days=8",
        { params: { latitude: nLatitude, longitude: nLongitude, timezone: nTimeZone } }
    )
    .then(({ data }) => { 
        // console.log('getForecastNavigator', data); 
        // let extractedData = extractForecastWeatherData(data);
        // extracted data to view on console
        // console.log('extractForecastWeatherData', extractedData);
        setForecast(extractForecastWeatherData(data));
    })
    .catch(err => console.log(err));

}


export const getForecastGeocoder = async ({ geoData, timezone, setForecast, setNws, setAlerts, temp }) => {
    
    await axios
    .get((temp == 'F') ? 
        "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weathercode,visibility,winddirection_10m,windspeed_10m,windgusts_10m,dewpoint_2m,pressure_msl&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&forecast_days=8"
        :
        "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weathercode,visibility,winddirection_10m,windspeed_10m,windgusts_10m,dewpoint_2m,pressure_msl&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&timeformat=unixtime&forecast_days=8",
        { params: { latitude: geoData.latitude, longitude: geoData.longitude, timezone: timezone } }
    )
    .then(({ data }) => { 
        // console.log('getForecastGeoCoder', data); 
        // let extractedData = extractForecastWeatherData(data);
        // extracted data to view on console
        // console.log('extractForecastWeatherData', extractedData);
        setForecast(extractForecastWeatherData(data));
    })
    .catch(err => console.log(err));

    getWeatherNWS(geoData.latitude, geoData.longitude, setNws)
    getNWSAlerts(geoData.latitude, geoData.longitude, setAlerts, timezone)

}


export const getWeatherNWS = async (latitude, longitude, setNws) => {
    await axios
    .get(`https://api.weather.gov/points/${latitude},${longitude}`)
    .then(({ data }) => { 
        axios.get(data.properties.forecast)
        .then(({ data }) => { 
            setNws({ name: data.properties.periods[0].name, shortForecast: data.properties.periods[0].shortForecast, detailedForecast: data.properties.periods[0].detailedForecast })
        })
        .catch(err => {
            console.log('Error fetching NWS forecast', err);
            setNws({ name: "", shortForecast: "", detailedForecast: "" });
        });
    })
    .catch(err => console.log(err));
}

export const getNWSAlerts = async (latitude, longitude, setAlerts, timeZone) => {
    await axios
    .get(`https://api.weather.gov/alerts/active?point=${latitude},${longitude}`)
    .then(({ data }) => { 
        (data.features.length > 0) ?
        setAlerts({
            areaDesc: data.features[0].properties.areaDesc,
            certainty: data.features[0].properties.certainty,
            urgency: data.features[0].properties.urgency,
            severity: data.features[0].properties.severity,
            effective: isoToHumanTime(data.features[0].properties.effective, timeZone),
            ends: isoToHumanTime(data.features[0].properties.ends, timeZone),
            event: data.features[0].properties.event,
            description: data.features[0].properties.description,
            instruction: data.features[0].properties.instruction
        }) :
        setAlerts({
            areaDesc: "",
            certainty: "",
            urgency: "",
            severity: "",
            effective: "",
            ends: "",
            event: "",
            description: "",
            instruction: ""
        })
    })
    .catch(err => console.log(err));

}