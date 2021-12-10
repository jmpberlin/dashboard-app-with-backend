import React, { useEffect, useState } from 'react';
import axios from 'axios';
import openweathermap from '../../helpers/openweathermap.png';
import { processWeatherObj } from '../../functions/helpers';

const WetterBox = () => {
  const [weather, setWeather] = useState();
  const [refresh, setRefresh] = useState();
  const [searchvalue, setSearchvalue] = useState('berlin');
  const [errorMessage, setErrorMessage] = useState(null);

  const inputHandler = (e) => {
    let value = e.target.value;
    localStorage.setItem('weatherLocation', value);
  };
  const searchClickHandler = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    let bstore = localStorage.getItem('weatherLocation');
    let location = 'berlin';
    if (bstore && bstore.length > 0) {
      setSearchvalue(() => {
        setSearchvalue(bstore);
      });
      location = bstore;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=de&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_NEW}`
      )
      .then((weatherObj) => {
        let processed = processWeatherObj(weatherObj.data.list);
        setWeather(processed);
      })
      .catch((err) => {
        setWeather(null);
        setErrorMessage('Try different City!');
      });
  }, [refresh]);
  // if (!weather) {
  //   return (
  //     <div className='widgetbox'>
  //       <img id='icon' src={spinner} alt='spinner wheel' />
  //     </div>
  //   );
  // }
  return (
    <div className='wetterbox widgetbox'>
      <div className='upperbox'>
        <div className='icon'>
          <img id='icon' src={openweathermap} alt='' />
        </div>
        <div className='input o-input'>
          <input
            onChange={inputHandler}
            id='t-input'
            type='text'
            placeholder={searchvalue}
          ></input>
          <button onClick={searchClickHandler}>Go!</button>
        </div>
      </div>
      {weather && (
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
      )}
      {!weather && (
        <div className='widgetbox'>
          <h3>{errorMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default WetterBox;
