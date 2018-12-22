var Twitter = require('twitter');
 
var client = new Twitter({
  // consumer_key: process.env.TWITTER_CONSUMER_KEY,
  // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET

});
 
var params = {screen_name: 'featsof'};




function getFavs(){
	
	client.get('favorites/list', function(error, tweets, response) {
	  if(error) throw error;
	  // console.log(tweets);  // The favorites.
	  // console.log(response);  // Raw response object.
	  });
	
};

function removeFav(id){
	client.post('favorites/destroy/:id', {id: id},  function(error, tweet, response) {
	//	if(error) throw error;
		console.log(tweet);  // Tweet body.
		console.log(response);  // Raw response object.
});
};

var unFavId = getFavs();
//removeFav(946552472272699400);


