const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnNewQuote = document.getElementById('new-quote');
const btnTwitter = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

function setNewQuote() {
	showLoadingSpinner();

	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * (apiQuotes.length + 1))];
	// check null or undefined
	authorText.textContent = quote.author ?? 'Unknown';

	// Check Quote length to determine styling
	if (quote.text.length > 100) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	// Set Quote, Hide Loader
	quoteText.textContent = quote.text;
	removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
	showLoadingSpinner();

	const apiUrl = 'https://type.fit/api/quotes';
	try {
		apiQuotes = await (await fetch(apiUrl)).json();
		setNewQuote();
	} catch (error) {
		console.log('Error: ', error);
		alert(error);
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

// Event Listeners
btnNewQuote.addEventListener('click', setNewQuote);
btnTwitter.addEventListener('click', tweetQuote);

// On Load
getQuotes();
