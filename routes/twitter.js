var express = require('express');
var router = express.Router();

// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent';

async function getRequest() {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned
  const params = {
    query: '#Berlin lang:de',
    'tweet.fields': 'author_id',
    max_results: '10',
    expansions: 'author_id',
    'user.fields': 'description',
  };

  const res = await needle('get', endpointUrl, params, {
    headers: {
      'User-Agent': 'v2RecentSearchJS',
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  getRequest().then((resFromReq) => {
    res.json({ success: true, resFromTwitter: resFromReq });
  });
});

module.exports = router;
