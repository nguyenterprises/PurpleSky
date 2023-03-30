import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;

export const renderMap = ( mapContainer, mapC, longitude, latitude, zoom ) => {
    mapC = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/hanhnguy/clf4b9bnn000101o73vtbritt',
        center: [ longitude, latitude ],
        zoom: zoom,
        interactive: false
      });

      mapC.on('load', () => {

        mapC.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              { 'type': 'Feature', 'properties': {}, 'geometry': { 'type': 'Point', 'coordinates': [longitude, latitude] } }
            ]
          }
        });

        mapC.addLayer({
          'id': 'circle',
          'type': 'circle',
          'source': 'points',
          'paint': {
            'circle-color': '#FFFFFF',
            'circle-radius': 3,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#000000'
          }
        });

        fetch("https://api.rainviewer.com/public/weather-maps.json")
          .then(res => res.json())
          .then(apiData => {
            apiData.radar.past.forEach(frame => {
              mapC.addLayer({
                id: `rainviewer_${frame.path}`,
                type: "raster",
                source: {
                  type: "raster",
                  tiles: [
                    apiData.host + frame.path + '/256/{z}/{x}/{y}/2/1_1.png'
                  ],
                  tileSize: 256
                },
                layout: { visibility: "none" },
                minzoom: 0,
                maxzoom: 12
              });
            });

            let i = 0;
            const interval = setInterval(() => {
              if (i > apiData.radar.past.length - 1) {
                clearInterval(interval);
                return;
              } else {
                apiData.radar.past.forEach((frame, index) => {
                  mapC.setLayoutProperty(
                    `rainviewer_${frame.path}`,
                    "visibility",
                    index === i || index === i - 1 ? "visible" : "none"
                  );
                });
                if (i - 1 >= 0) {
                  const frame = apiData.radar.past[i - 1];
                  let opacity = 1;
                  setTimeout(() => {
                    const i2 = setInterval(() => {
                      if (opacity <= 0) {
                        return clearInterval(i2);
                      }
                      mapC.setPaintProperty(
                        `rainviewer_${frame.path}`,
                        "raster-opacity",
                        opacity
                      );
                      opacity -= 0.1;
                    }, 50);
                  }, 400);
                }
                i += 1;
              }
            }, 2000);
          })
          .catch(console.error);

      });
}


 
        
     