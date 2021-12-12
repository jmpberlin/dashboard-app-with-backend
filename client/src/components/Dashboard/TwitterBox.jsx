import React, { useEffect, useState } from 'react';
import axios from 'axios';
import twittericon from '../../helpers/twittericon.png';
import { processTwitterData, openInNewTab } from '../../functions/helpers.js';

const TwitterBox = () => {
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

    return function cleanup() {
      clearTimeout(recurseTimer);
    };
  }, [refresh]);

  const twitterClickHandler = (name) => {
    openInNewTab(`https://twitter.com/${name}`);
  };
  return (
    <div className='twitterbox widgetbox'>
      <div className='upperbox'>
        <div className='icon'>
          <img src={twittericon} id='icon' alt='' />
        </div>
        <div className='input t-input'>
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
      <div className='scrollable-y-div'>
        {twitterPosts.map((postObj) => {
          return (
            <div
              key={postObj.post.id}
              className='content-div t-link'
              onClick={() => {
                twitterClickHandler(postObj.user.username);
              }}
            >
              <h4>By {postObj.user.name}</h4>
              <p>{postObj.post.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TwitterBox;
