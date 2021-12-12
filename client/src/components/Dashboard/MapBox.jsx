import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxIcon from '../../helpers/mapbox.png';
import axios from 'axios';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const MapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [searchvalue, setSearchvalue] = useState('Berlin');
  const [coordinates, setCoordinates] = useState({
    la: 13.4,
    lo: 52.52,
  });
  const [refresh, setRefresh] = useState(false);

  const inputHandler = (e) => {
    let value = e.target.value;
    localStorage.setItem('mapboxTag', value);
  };
  const clickHandler = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    // IF MAP SHOULDNT BE REINITIALIZED UNCOMMENT BELOW
    // if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinates.la, coordinates.lo],
      zoom: 10,
    });
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker(el)
      .setLngLat([coordinates.la, coordinates.lo])
      .addTo(map.current);
  });

  useEffect(() => {
    let search = 'berlin';
    let bstore = localStorage.getItem('mapboxTag');
    if (bstore && bstore.length > 0) {
      setSearchvalue(() => {
        setSearchvalue(bstore);
      });
      search = bstore;
    }
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${mapboxgl.accessToken}`
      )
      .then((resFromMB) => {
        let data = resFromMB.data.features[0];
        let longitude = data.center[1];
        let latitude = data.center[0];
        setCoordinates({ la: latitude, lo: longitude });
      });
  }, [refresh]);

  return (
    <div className='widgetbox mapbox'>
      <div className='upperbox'>
        <div className='icon'>
          <img src={mapboxIcon} id='icon' alt='' />
        </div>
        <div className='input m-input'>
          <input
            onChange={inputHandler}
            id='m-input'
            type='text'
            placeholder={searchvalue}
          ></input>
          <button onClick={clickHandler}>Go!</button>
        </div>
      </div>
      <div className='mapbox-lower content-div'>
        <div ref={mapContainer} className='map-container'></div>
      </div>
    </div>
  );
};

export default MapBox;
