import { isoToHumanTime } from "./time";

export const sliceOfDay = (forecast, num) => {
    function dayofMonth(day, plus, timezone){
      let theDate = isoToHumanTime(day, timezone);
      let tomo = new Date(theDate);
      tomo.setDate(tomo.getDate() + plus)
      return tomo.getDate()
    }
    // only 2 equal signs because hour.humanDay is a string
    const tomoFilter = forecast.hourly.filter(hour => hour.humanDay == dayofMonth(forecast.current.currentTime, num, forecast.timeZone.timeZone));

    const indexes = tomoFilter.map(obj => forecast.hourly.indexOf(obj))
    const indexStart = indexes[0];
    const indexEnd = indexes[indexes.length - 1];

    return { start: indexStart, end: indexEnd }
}