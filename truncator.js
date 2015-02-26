/**
Get all the words from the parser and 
truncates in the following order :
1. replace words with chat equivalents
2. try to remove vowels
**/
function truncate( tweet , parsedTweet , render ){

	allWords = parsedTweet[ 'words' ];
	chatWordEquivalents = chatify( tweet.length , allWords );
	
	for( key in chatWordEquivalents ){
		
		value = " " + chatWordEquivalents[ key ] + " ";
		key = /(\s)+key[(\s)|[.,]]/g;
		reg = new RegExp( key );
		tweet = tweet.replace( reg , value );
		
	}
	
	compressWordEquivalents = compress( tweet.length , allWords );
	for( key in compressWordEquivalents ){
		
		value = " " + compressWordEquivalents[ key ] + " ";
		key = " " + key + " ";
		reg = new RegExp( key , 'g' );
		tweet = tweet.replace( reg , value );
		
	}

	render( tweet );
	return;
}

function compress( tweetSize , words ){

	chatEq = {};
	for( i =0; i < words.length; i++ ){

		if( words[i].length > 2 ){
			chatWord = words[ i ].replace( /e/g , '' );
			chatWord = words[ i ].replace( /o/g , '' );
			chatWord = words[ i ].replace( /u/g , '' );
			chatWord = words[ i ].replace( /ing/g , 'ng' );

			chatEq[ words[i] ] = chatWord;
			reducedWordSize = words[ i ].length - chatWord.length;
			tweetSize = tweetSize - reducedWordSize;
		}
			
	
		if( tweetSize <= 140 )
			break;
	}		
	return chatEq;
}

/**
chat equivalents :
To = 2
Today = 2day
Tomorrow = 2mrw
Please = pls
Because = b/c
With = w/
Without = w/o
Before = b4
Great = gr8
Ate = 8
Okay/Ok = k
People = ppl
For = 4
Be = b
See = c
Owe = o
Are = r
You = u
Why = y
About = abt
Awesome = awsm
Birthday = b/day
Check = chk
Could = cd
Should = shd
Would = wd
Disconnect = dc
Enough = enuf
**/
function chatify( tweetSize , words ){

	chatEq = {};
	for( i =0; i < words.length; i++ ){

		chatWord = getChatWord( words[i] );
		if( chatWord != words[i] ){
			chatEq[ words[i] ] = chatWord;
			reducedWordSize = words[ i ].length - chatWord.length;
			tweetSize = tweetSize - reducedWordSize;
		}
		if( tweetSize <= 140 )
			break;
			
	}
	return chatEq;
}

function getChatWord( word ){

	switch( word.toLowerCase() ) {
		case 'too' :
		case 'to' : return '2';
		case 'today' : return '2day';
		case 'tomorrow' : return '2mrw';
		case 'please' : return 'pls';
		case 'because' : return 'bc';
		case 'with' : return 'w/';
		case 'without' : return 'w/o';
		case 'beore' : return 'b4';
		case 'great' : return 'gr8';
		case 'ate' : return 'ate';
		case 'okay' : return 'ok';
		case 'ok' : return 'k';
		case 'people' : return 'ppl';
		case 'for' : 
		case 'four' : return '4';
		case 'be' : return 'b';
		case 'see' : return 'c';
		case 'owe' : return 'o';
		case 'are' : return 'r';
		case 'you' : return 'u';
		case 'your' :
		case "you're" :
		case 'youre' : return 'ur';
		case 'why' : return 'y';
		case 'about' : return 'abt';
		case 'awesome' : return 'awsm';
		case 'birthday' : return 'bday';
		case 'check' : return 'chk';
		case 'could' : return 'cd';
		case 'should' : return 'shd';
		case 'would' : return 'wd';
		case 'disconnect' : return 'dc';
		case 'enough' : return 'enuf';
		default : return word;
	}
}