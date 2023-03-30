import axios from "axios";

const timezoneKey = import.meta.env.VITE_API_TIMEZONEDB;

export const getTimeZone = async ( latitude, longitude, setTimeZone ) => {
    const res = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`);
    setTimeZone(res.data.zoneName);
}
