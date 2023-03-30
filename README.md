# PurpleSky

Why PurpleSky?:

  On the computer I used to check the weather with my original go-to - DarkSky.net, which unfortunately is no more thanks to Apple's buyout. Aside from being eerily accurate at times, the site's minimalistic layout yet direct and to the point format was visually appealing.

  PurpleSky takes cues from DarkSky's look and feel. Although it doesn't use the same proprietary radar technology for weather prediction, I displayed the charts and visuals to emulate DarkSky's features. All design was done by hand with plain CSS. Many times I was tempted to just use a package like Tailwind or MUI, but I decided to stick with unassisted styling.

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

Afterthoughts:

The program is more extensive than it appears on the surface. Several functions were compiled for adjusting the UNIX values with local time zones and mapping them for days and hours. Creating and looping through the bar charts from scratch was a bit lengthy but proved successful. The CSS was dependent on grid and flex layout properties. The program became more complicated than originally planned, hence the surplus amount of useState hooks utilized. I started out with just a few, but halfway through, I determined it would have been cleaner if I had used the useReducer hook. For efficiency, I also even considered using context api or even Redux (on a scalable level, if necessary). However, to be consistent, I followed through with just useState hooks and passed props through components. Overall, it was a fruitful project that I may scale up in the future with a backend and themed backgrounds. You can see the code here - .  Styling was directly typed into the component, so any CSS has been removed for ease and clarity in reading. If you would like to see it along with the styling, you are welcome to contact me directly - hanh@nguyenterprises.work.

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
