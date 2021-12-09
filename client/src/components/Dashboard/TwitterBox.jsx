import React, { useEffect, useState } from 'react';
import axios from 'axios';
import twittericon from '../../helpers/twittericon.png';
import { processTwitterData } from '../../functions/helpers.js';

const TwitterBox = () => {
  //The actual Post
  const [twitterPosts, setTwitterPosts] = useState([]);

  // once the component did render, the first tweet is fetched
  useEffect(() => {
    axios.get('/api/twitter/').then((resFromApi) => {
      let processed = processTwitterData(resFromApi);
      setTwitterPosts(processed);
    });
    // after that an interval is being started, that gets the new tweets every 8 secs
    const interval = setInterval(() => {
      axios.get('/api/twitter/').then((resFromBackend) => {
        let processed = processTwitterData(resFromBackend);
        setTwitterPosts(processed);
      });
    }, 8000);
    // cleanup function clears the interval, when the component unmounts and prevents data leaks
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='twitterbox widgetbox'>
      <div className='upperbox'>
        <div className='icon'>
          <img src={twittericon} id='icon' alt='' />
        </div>
        <div className=''>
          <h4>#Berlin</h4>
        </div>
      </div>
      {twitterPosts.map((postObj) => {
        return (
          <div key={postObj.post.id} className='content-div'>
            <h4>
              By{' '}
              <a
                target='new'
                href={`https://twitter.com/${postObj.user.username}`}
              >
                {postObj.user.name}
              </a>
            </h4>
            <p>{postObj.post.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TwitterBox;
