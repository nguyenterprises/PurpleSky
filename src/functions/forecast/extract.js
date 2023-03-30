import { humanTime } from "../time";

export const extractForecastWeatherData = ( data ) => {
    return {
        current: extractCurrentWeatherData(data),
        daily: extractDailyWeatherData(data),
        hourly: extractHourlyWeatherData(data),
        timeZone: extractTimeZoneData(data),
    }
}
const extractTimeZoneData = ( data ) => {
    return {
        timeZone: data.timezone,
        timeZoneAbbreviation: data.timezone_abbreviation,
        sunrise: humanTime(data.daily.sunrise[0] * 1000, data.timezone),
        sunset:  humanTime(data.daily.sunset[0] * 1000, data.timezone)
    }
};
const extractCurrentWeatherData = ({ current_weather, daily }) => {
    const {
        temperature: currentTemp,
        windspeed: windSpeed,
        winddirection: windDirection,
        weathercode: weatherCode,
        time: time,
    } = current_weather
    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],
    } = daily

    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windSpeed: Math.round(windSpeed),
        windDirection: windDirection,
        precip: Math.round(precip * 100) / 100,
        currentTime: time * 1000,
        weatherCode,
    }

}

const extractDailyWeatherData = ({ daily, timezone }) => {
    return daily.time.map((time, index) => {
        return {
          timestamp: time * 1000,
          humanDay: humanTime(time * 1000, timezone).split("/")[1],
          weatherCode: daily.weathercode[index],
          highTemp: Math.round(daily.temperature_2m_max[index]),
          lowTemp: Math.round(daily.temperature_2m_min[index]),
          highFeelsLike: Math.round(daily.apparent_temperature_max[index]),
          lowFeelsLike: Math.round(daily.apparent_temperature_min[index]),
          precip_hours: daily.precipitation_hours[index],
          precip_prob_max: daily.precipitation_probability_max[index],
          precip_sum: Math.round(daily.precipitation_sum[index]*100) / 100,
          rain_sum: Math.round(daily.rain_sum[index]*100) / 100,
          showers_sum: Math.round(daily.showers_sum[index]*100) / 100,
          snowfall_sum_cm: Math.round(daily.snowfall_sum[index]*100) / 100,
          sunrise: daily.sunrise[index] * 1000,
          sunset: daily.sunset[index] * 1000,
          uvIndex: daily.uv_index_max[index],
          windDirection: daily.winddirection_10m_dominant[index],
          windGusts: Math.round(daily.windgusts_10m_max[index]),
          windSpeed: Math.round(daily.windspeed_10m_max[index])
        }
      })
}

const extractHourlyWeatherData = ({ hourly, current_weather, timezone }) => {
    return hourly.time
    .map((time, index) => {
      return {
        timestamp: time * 1000,
        humanTime: humanTime(time * 1000, timezone),
        humanDay: humanTime(time * 1000, timezone).split("/")[1],
        weatherCode: hourly.weathercode[index],
        temperature: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        humidity: hourly.relativehumidity_2m[index],
        precipProbability: hourly.precipitation_probability[index],
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
        rain: Math.round(hourly.rain[index] * 100) / 100,
        showers: Math.round(hourly.showers[index] * 100) / 100,
        snowfall: Math.round(hourly.snowfall[index] * 100) / 100,
        visibility_meters: Math.round(hourly.visibility[index]),
        windGusts: Math.round(hourly.windgusts_10m[index]),
        windSpeed: Math.round(hourly.windspeed_10m[index]),
        windDirection: Math.round(hourly.winddirection_10m[index]),
        pressure: Math.round(hourly.pressure_msl[index]),
        dewpoint: Math.round(hourly.dewpoint_2m[index])
      }
    })
    .filter(({ timestamp }) => timestamp >= current_weather.time * 1000)

}