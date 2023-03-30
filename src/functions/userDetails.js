import axios from "axios";
import { defaultCoords } from "./defaults";

export const getUserDetails = async ({ coords, setUserDetails }) => {

  let uLatitude = (!coords) ? defaultCoords.latitude : coords.latitude;
  let uLongitude = (!coords)?defaultCoords.longitude:coords.longitude;
  
  const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${uLatitude}&lon=${uLongitude}&addressdetails=1`);

  setUserDetails(res.data.address);

}
