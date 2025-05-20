const url = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8f9275b32bmshdb49004967e719cp1a5b1fjsn603b265123dd',
		'x-rapidapi-host': 'quotes15.p.rapidapi.com'
	}
};

async function getRandomQuote() {
	const response = await fetch(url, options);
	
	return response.json().then(data => data.content);
}

// typing

const cursor = document.getElementById("cursor");
const text = document.getElementById("text");

let typed = "";

getRandomQuote().then(quote => {
	const start = Date.now();

	text.textContent = quote;

	// set cursor to start

	const range = document.createRange();

	range.setStart(text.firstChild, 0);
	range.setEnd(text.firstChild, 1);

	const rect = range.getBoundingClientRect();

	cursor.style.left = rect.left + "px";
	cursor.style.top = rect.top + "px";
	cursor.style.height = rect.height + "px";

	// update timer and wpm

	setInterval(() => {
		const time = Math.round((Date.now() - start) / 1000);
		const wpm = Math.round(typed.length / 5 / time * 60);

		document.getElementById("info").textContent = `${wpm} WPM | ${time} Seconds`;
	}, 1000);

	// type event

	document.addEventListener("keydown", event => {
		// update typed

		if (event.key.length === 1 && quote.startsWith(typed)) {
			typed += event.key;
		} else if (event.key === "Backspace") {
			typed = typed.slice(0, -1);
		}

		// update text

		if (quote.startsWith(typed)) {
			text.innerHTML = quote.replace(
				typed,
				`<span id="correct">${typed}</span>`
			)
		} else {
			const correct = typed.slice(0, -1);
			const missed = quote.slice(typed.length - 1, typed.length);

			text.innerHTML = quote.replace(
				correct + missed,
				`<span id="correct">${correct}</span><span id="missed">${missed}</span>`
			)
		}

		// update cursor

		if (!quote.startsWith(typed) || typed.length === 0) return;

		const range = document.createRange();
		const correct = text.querySelector("#correct");

		range.setStart(correct.firstChild, typed.length - 1);
		range.setEnd(correct.firstChild, typed.length);
	
		let rangeRect = range.getBoundingClientRect();
		const textRect = text.getBoundingClientRect();
		const scroll = rangeRect.top - textRect.top + text.scrollTop;

		text.scrollTo(0, scroll);

		rangeRect = range.getBoundingClientRect();

		cursor.style.left = `${rangeRect.right}px`;
		cursor.style.top = `${rangeRect.top}px`;
		cursor.style.height = `${rangeRect.height}px`;
	})
});