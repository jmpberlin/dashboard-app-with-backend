import React, { useEffect, useState } from 'react';
import axios from 'axios';
import spinner from '../../helpers/spinner.gif';
import openweathermap from '../../helpers/openweathermap.png';
import { processWeatherObj } from '../../functions/helpers';

const WetterBox = () => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    // console.log(process.env.REACT_APP_OPENWEATHERMAP_KEY);
    // `https://api.openweathermap.org/data/2.5/weather?q=berlin&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=Berlin&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_NEW}`
      )
      .then((weatherObj) => {
        let processed = processWeatherObj(weatherObj.data.list);
        setWeather(processed);
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
        <div className='scrollable-x-div'>
          {weather.map((forecast) => {
            return (
              <div key={forecast.key}>
                <div className='wetterbox-upper'>
                  <h4>{forecast.time}</h4>
                  <p>{forecast.description}</p>
                  <p>{forecast.temp}</p>
                </div>
                <div className='wetterbox-lower'>
                  <img src={forecast.icon} alt='' />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WetterBox;
