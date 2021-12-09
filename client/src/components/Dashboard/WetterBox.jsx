import React, { useEffect, useState } from 'react';
import axios from 'axios';
import spinner from '../../helpers/spinner.gif';
import openweathermap from '../../helpers/openweathermap.png';

const WetterBox = () => {
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    console.log(process.env.REACT_APP_OPENWEATHERMAP_KEY);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=berlin&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`
      )
      .then((weatherObj) => {
        setWeather(weatherObj.data.weather);
        setTemp(weatherObj.data.main.temp);
        console.log(weatherObj.data);
      });
  }, []);
  if (!weather) {
    return (
      <div className='widgetbox'>
        <img id='icon' src={spinner} alt='spinner wheel' />
      </div>
    );
  }
  return (
    <div className='wetterbox widgetbox'>
      <div className='upperbox'>
        <div className='icon'>
          <img id='icon' src={openweathermap} alt='' />
        </div>
        <div>
          <h4>Openweathermap</h4>
          <p>#Berlin #aktuellesWetter</p>
        </div>
      </div>
      <div className='content-div'>
        <h4>{weather[0].description}</h4>
        <p>{temp}°C </p>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${'10d'}@2x.png`}
            alt='weather icon'
          />
        </div>
      </div>
    </div>
  );
};

export default WetterBox;
