/**
Accepts text from the textarea.
Returns result array in the following format :
Result['handles'] = { @handle1, @handle2, @handle3 }
Result['links'] = { www.link1.com , www.link2.com }
Result['hashtags'] = { #tag1 , #tag2 }
Result['words'] = { random1, word1 }
**/
function parse( tweet , callback , render ){

	allWords = tweet.match(/\S+/g);
	result = {};
	for( i = 0 ; i < allWords.length ; i++ ){

		// Check the first letter of the word for handles and hashtags
		startLetter = allWords[i][0];
		if( startLetter == '@')
			result = pushWordIntoCategory( allWords[ i ] , 'handles' , result );
		else if( startLetter == '#' )
			result = pushWordIntoCategory( allWords[ i ] , 'hashtags' , result );
		else if( allWords[ i ].match( linkRegEx ) ) 
			result = pushWordIntoCategory( allWords[ i ] , 'links' , result );
		else
			result = pushWordIntoCategory( allWords[ i ] , 'words' , result );

	}
	for( key in result ){
		console.log( " Key " + key + " Has " + result[ key ] );
	}
	callback( tweet , result , render );
}

function pushWordIntoCategory( word , category , result ){

	if( result[ category ] )
		result[ category ].push( word );
	else
		result[ category ] = [word];
	return result;
}