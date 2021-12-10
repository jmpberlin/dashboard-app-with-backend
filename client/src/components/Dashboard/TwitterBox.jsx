import React, { useEffect, useState } from 'react';
import axios from 'axios';
import twittericon from '../../helpers/twittericon.png';
import { processTwitterData } from '../../functions/helpers.js';

const TwitterBox = () => {
  //The actual Post
  const [twitterPosts, setTwitterPosts] = useState([]);
  const [searchvalue, setSearchvalue] = useState('Berlin');
  const [refresh, setRefresh] = useState(false);
  const inputHandler = (e) => {
    let value = e.target.value;
    localStorage.setItem('twitterTag', value);
  };
  const searchClickHandler = () => {
    setRefresh(!refresh);
  };

  // once the component did render, the first tweet is fetched
  useEffect(() => {
    let bstore = localStorage.getItem('twitterTag');
    let hashtag = 'berlin';
    if (bstore && bstore.length > 0) {
      setSearchvalue(() => {
        setSearchvalue(bstore);
      });
      hashtag = bstore;
    }

    axios.get(`/api/twitter/${hashtag}`).then((resFromApi) => {
      let processed = processTwitterData(resFromApi);
      setTwitterPosts(processed);
    });
    const recurseTimer = setTimeout(() => {
      setRefresh(!refresh);
    }, 8000);
    // after that an interval is being started, that gets the new tweets every 8 secs
    // const interval = setInterval(() => {
    //   axios.get(`/api/twitter/${hashtag}`).then((resFromBackend) => {
    //     let processed = processTwitterData(resFromBackend);
    //     setTwitterPosts(processed);
    //   });
    // }, 8000);
    // cleanup function clears the interval, when the component unmounts and prevents data leaks
    return function cleanup() {
      // clearInterval(interval);
      clearTimeout(recurseTimer);
    };
  }, [refresh]);

  return (
    <div className='twitterbox widgetbox'>
      <div className='upperbox'>
        <div className='icon'>
          <img src={twittericon} id='icon' alt='' />
        </div>
        <div className='twitter-input'>
          <label htmlFor='t-input'>#</label>
          <input
            onChange={inputHandler}
            id='t-input'
            type='text'
            placeholder={searchvalue}
          ></input>
          <button onClick={searchClickHandler}>Go!</button>
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
