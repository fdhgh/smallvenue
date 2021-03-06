var express = require('express');
var Twitter = require('twitter');
 
var app = express();
app.set('port', process.env.PORT || 5000); 
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
 
var params = {screen_name: 'finevenue'};

var fs = require("fs");
var text = fs.readFileSync("resources/bands.txt").toString('utf-8');
var vowels = ["a","e","i","o","u"];
var words = text.split(/[ :;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
var structures = [];
// 0 = ___
// 1 = ___ ___
// 2 = __ and the __s
// 3 = ___ (joiner) ___
// 4 = ___-___

var joiners = ["the","as","of","to","on","at","in","for the","From","and", "Into", "Upon","from the","of the", "Under", "Over"];

function createBill(){
	var band1 = createBand();
	var band2 = createBand();
	var band3 = createBand();
	var price = randNumber(14)+1;
	var time = randNumber(8)+3;
	var bill = "TONIGHT: " + band1 + " / " + band2 + " / " + band3 + "\r\n Doors " + time + "pm, £" + price + " OTD";
	return bill;
}


function createBand() {
	var structure = randNumber(7);
	var name = "none generated";
	
	switch (structure) {
	  case 0:
	  // plural(a)
		a = chooseWord();
		var i = randNumber(5);
		if (i = 0){
			name = "The " + a;
		}else if(i=1){
			name = "The " + plural(a);
		}else{
			name = plural(a);
		}
		break;
		
	  case 1:
	  case 6:
	  // a b
		a = chooseWord();
		b = chooseWord();
		var i = randNumber(2);
		if (i = 0){
			name = a + " " + plural(b);
		}else{
			name = a + " " + b;
		}
		break;
	
	  case 2:
	  // a and the b
		a = chooseWord();
		b = chooseWord();
		name = a + " and the " + plural(b);
		break;
		
	  case 3:
	  // a joiner b
		a = chooseWord();
		b = chooseWord();
		var i = randNumber(2);
		if (i = 0){
			name = a + " " + joiners[randNumber(joiners.length)] + " " + b;
		}else{
			name = a + " " + joiners[randNumber(joiners.length)] + " " + plural(b);
		}
		
		break;
		
	  case 4:
		a = chooseWord();
		b = chooseWord();
		name = (a + b).toUpperCase();
		break;
		
	  case 5:
		a = chooseWord();
		name = a.toUpperCase();
		break;

	}
	return name;
}

function randNumber(max) {
	return  Math.floor((Math.random() * (max)));
}

function chooseWord(){
	
	return toTitleCase(words[randNumber(words.length)]);
}

function plural(word){
	var lc1 = word.charAt(word.length-1);
	var lc2 = word.charAt(word.length-2);
	if(lc1 == "y" && !(vowels.includes(lc2))) {
		word = word.replace(/.$/,"ies");

	} else if(["s","o"].includes(lc1) || (lc1 == "h" && lc2 == "c")){
		word = word + "es";
		
	} else if(["x","z"].includes(lc1)){
		// do nothing
	
	} else {
		word = word + "s";
	}
	return word;
}

function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}

app.listen(app.get('port'), function() {
  console.log('Bot is running on port', app.get('port'));
});

// source: https://stackoverflow.com/questions/4455282/call-a-javascript-function-at-a-specific-time-of-day
var now = new Date();
var millisTillTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30, 0, 0) - now;
if (millisTillTime < 0) {
     millisTillTime += 86400000; // it's after 10am, try 10am tomorrow.
}
setTimeout(function(){makeTweet();}, millisTillTime);

function makeTweet(){
	var statustext = createBill();

	client.post('statuses/update', {status: statustext},  function(error, tweet, response) {
	  if(error) throw error;
	  console.log(tweet);  // Tweet body.
	  console.log(response);  // Raw response object.
	});
	
};






