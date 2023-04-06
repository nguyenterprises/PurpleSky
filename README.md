# PurpleSky


![Image](/public/purplesky_screenshot)

Demo: https://purplesky.netlify.app/

Features:
 - Farenheit to Celcius toggle option
 - Wind arrow moves with wind direction
 - UV Index color changes with index
 - NOAA weather.gov alerts and descriptions appear when applicable
 - Icons, backgrounds and timelines all sync with local time
 - CSS responsive to screen size
 - Weather layer loops over map
 - Rain probability appears on card chart when applicable

Code & Design:
 - ReactJS for code
 - Plain CSS for styling
 - No backend needed
 - insert github link here

APIs Used:
 - Open-Meteo Weather for forecast data
 - Rainview for map weather overlay
 - Mapbox for geocoder and map
 - NOAA weather.gov for weather descriptions and alerts
 - Open Street Maps for reverse geocoding
 - TimezoneDB for proper time setting

Additional Packages:
 - Cloudinary for assets and icons
 - React-Use-Measure for element positioning
 - Axios for APIs
 - DotEnv for keys

Questions:
- Was the base code written from scratch or was it cloned from github? Written from scratch
- Was the code written following React best practices guidelines? Yes
- Is the code written and laid out to be scalable? Yes
- Was a package used for CSS? No

React Best Practices:
- Good folder structure? Yes
- Structured import order? Yes
- Functional components used? Yes
- Code formatted before committing? Yes
- Compound component pattern used? Yes, Weather.jsx is the parent component
- Linter used? Yes, ESLint
- Jest or React Testing Library used? No, manually tested
- Typescript used? Yes
- Lazy loading used? No, not needed in this case
- Code splitting used? No, not needed in this case
- Custom hooks for reusable logic? Yes
- Error handling types used? Yes, catch and log
- Unique key props? Yes, when applicable
- useReducer hook used? No, please see explanation in Afterthoughts section

Hope you enjoy.
