import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TwitterBox = () => {
  //The actual Post
  const [twitterPost, setTwitterPost] = useState('');
  //the related twitter User:
  const [twitterUser, setTwitterUser] = useState('');
  // once the component did render, the first tweet is fetched
  useEffect(() => {
    axios.get('/api/twitter/').then((resFromBackend) => {
      console.log(resFromBackend);
      setTwitterPost(resFromBackend.data.resFromTwitter.data[0].text);
    });
    // after that an interval is being started, that gets the new tweets every 8 secs
    const interval = setInterval(() => {
      axios.get('/api/twitter/').then((resFromBackend) => {
        let apiData = resFromBackend.data.resFromTwitter;
        setTwitterPost(apiData.data[0].text);
        setTwitterUser(apiData.includes.users[0].name);
      });
    }, 8000);
    // cleanup function clears the interval, when the component unmounts and prevents data leaks
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h4>#Berlin</h4>
      <p>Tweet by {twitterUser}</p>
      <p>{twitterPost}</p>
    </div>
  );
};

export default TwitterBox;