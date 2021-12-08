import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
        'https://v5.bvg.transport.rest/stops/900000068201/departures?results=5'
      )
      .then((timetable) => {
        setConnections(timetable.data);
        // console.log('this is the timetable ', timetable);
      });
  }, []);
  return (
    <div>
      <h4>#Tempelhof</h4>
      <h5>{station.name}</h5>
      <hr />
      {connections.map((trip) => {
        return (
          <div key={trip.tripId}>
            <p>
              {trip.line.name} - {trip.direction}
            </p>
            {/* <p>{trip.plannedWhen}</p>
            <p>
              {trip.when} + {trip.delay}
            </p> */}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default BvgBox;
