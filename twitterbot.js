const {TwitterApi} = require('twitter-api-v2');

const client = new TwitterApi({
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  access_token: 'ACCESS_TOKEN',
  access_token_secret: 'ACCESS_TOKEN_SECRET',
});
const bearer = new TwitterApi(process.env.BEARER_TOKEN)
const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;
// Track the "ESTIAM" hashtag
const stream = T.stream('statuses/filter', { track: 'ESTIAM' });


// Like every tweet with the hashtag
stream.on('tweet', function(tweet) {
  T.post('favorites/create', { id: tweet.id_str }, function(err, data, response) {
    console.log(data);
  });
});

// Retweet every post containing the hashtag
stream.on('tweet', function(tweet) {
  T.post('statuses/retweet/:id', { id: tweet.id_str }, function(err, data, response) {
    console.log(data);
  });
});

// Follow users mentioning the hashtag with more than 100 followers
stream.on('tweet', function(tweet) {
  if (tweet.user.followers_count > 100) {
    T.post('friendships/create', { screen_name: tweet.user.screen_name }, function(err, data, response) {
      console.log(data);
    });
  }
});

