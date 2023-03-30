import { getUserDetails } from "./userDetails";
import { getForecastNavigator } from "./forecast/getForecast";

export const navigatorGeolocation = ({ setUserDetails, setForecast, setMapCoords, setNws, setAlerts, temp }) => {

    navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

    function positionSuccess({ coords }) {
      getUserDetails({ coords, setUserDetails });
      getForecastNavigator ({ coords, setForecast, setNws, setAlerts, temp });
      setMapCoords({ latitude: coords.latitude, longitude: coords.longitude });
    }

    function positionError({ coords }) {
      getUserDetails({ coords, setUserDetails });
      getForecastNavigator ({ coords, setForecast, setNws, setAlerts, temp });
    }

}