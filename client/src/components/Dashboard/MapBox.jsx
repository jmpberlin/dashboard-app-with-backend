import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxIcon from '../../helpers/mapbox.png';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const MapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [13.4, 52.52],
      zoom: 10,
    });
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker(el).setLngLat([13.4, 52.52]).addTo(map.current);
  });
  useEffect(() => {});

  return (
    <div className='widgetbox mapbox'>
      <div className='upperbox'>
        <div className='icon'>
          <img src={mapboxIcon} id='icon' alt='' />
        </div>
        <div className='input m-input'>
          <input
            // onChange={inputHandler}
            id='m-input'
            type='text'
            // placeholder={searchvalue}
          ></input>
          <button>Go!</button>
        </div>
      </div>
      <div className='mapbox-lower content-div'>
        <div ref={mapContainer} className='map-container'></div>
      </div>
    </div>
  );
};

export default MapBox;
