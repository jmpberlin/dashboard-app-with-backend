import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatTime } from '../../functions/helpers';
import bvgicon from '../../helpers/bvg.png';

const BvgBox = () => {
  const [station, setStation] = useState({});
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    // Maybe get rid of the first axios req, depending where the initial Location input comes from
    axios
      .get(
        'https://v5.bvg.transport.rest/locations?poi=false&addresses=false&query=tempelhof'
      )
      .then((station) => {
        setStation(station.data[0]);
        // console.log('this is the Station Tempelhof ', station.data[0]);
      });

    axios
      .get(
        'https://v5.bvg.transport.rest/stops/900000068201/departures?results=3'
      )
      .then((timetable) => {
        setConnections(timetable.data);
        // console.log('this is the timetable ', timetable);
      });
  }, []);
  return (
    <div className='bvgbox widgetbox'>
      <div className='upperbox'>
        <div className='icon'>
          <img id='icon' src={bvgicon} alt='' />
        </div>
        <div>
          <h4>{station.name}</h4>
          <p>Abfahrten:</p>
        </div>
      </div>
      <div className='content-div'>
        {connections.map((trip) => {
          return (
            <div key={trip.tripId}>
              <p>
                {trip.line.name} - Richtung {trip.direction}
              </p>
              <p>Um : {formatTime(trip.when)}</p>

              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BvgBox;
