linkRegEx = /^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU|ME|me)$/g;

/**
	The listener where all the magic happens.
	1. Once the button is clicked, the tweet is retreived.
	2. The tweet is parsed so as to not truncate handles, links and hashtags
	3. The words are then truncated and returned as a map of orginal word -> truncated word
	4. The original tweet has all the words replaced.
**/
document.addEventListener("DOMContentLoaded" , function(evt){

	document.addEventListener("keyup",function() {
		tweetContent = document.getElementById("tweet").value;
		renderCharCount( tweetContent.length );

	});

	document.getElementById("truncate").addEventListener("click",function(){
		tweet = document.getElementById("tweet").value;
		renderText( tweet + " Works! " );
		parse( tweet , truncate , renderText );
		tweetContent = document.getElementById("tweet").value;
		renderCharCount( tweetContent.length );
	});

});

function renderText( text ){
	document.getElementById("tweet").value = text;

}
function renderCharCount( number ){
	console.log( " Reached render char count with number " + number );
	document.getElementById("count").innerHTML = number + " Chars. ";
}