import React from 'react';
import {Map, Marker } from 'react-map-gl';
import {FaMapMarkerAlt} from 'react-icons/fa'
function MapBox() {
  return (
    <div className='w-5/2 xl:h-3/5 sm:h-1/5 mr-8 mt-12'>
      <Map
        initialViewState={{
          longitude: 76.308411,
          latitude: 10.026617,
          zoom: 14
        }}
       mapStyle = {import.meta.env.VITE_MAP_STYLE}
       MAPBOX_ACCESS_TOKEN
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}

      >
        <Marker longitude={76.308411} latitude={10.026617} offsetTop={-20} offsetLeft={-10}>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <FaMapMarkerAlt/>

        </div>
       
        </Marker>
      </Map>
    </div>
  );
}

export default MapBox;

