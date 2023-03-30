import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { renderMap } from '../functions/renderMap';

mapboxgl.accessToken = import.meta.env.VITE_API_KEY;

function Map({ mapCoords }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [longitude, setLongitude] = useState(mapCoords.longitude);
  const [latitude, setLatitude] = useState(mapCoords.latitude);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
   
      setLongitude(mapCoords.longitude);
      setLatitude(mapCoords.latitude);
    
  },[mapCoords])

  useEffect(() => {
    if (latitude && longitude) {
      const mapC = map.current
      renderMap( mapContainer, mapC, longitude, latitude, zoom );
    }
  },[longitude, latitude]);


  return (
    <div>
      <div ref={mapContainer} />
    </div>
  );
}

export default Map
