async function getRandomQuote() {
	const response = await fetch("https://thequoteshub.com/api/");

	return response.json();
}

// typing

const cursor = document.getElementById("cursor");
const text = document.getElementById("text");

let typed = "";

getRandomQuote().then(quote => {
	text.textContent = quote.text;

	// set cursor to start

	const range = document.createRange();

	range.setStart(text.firstChild, 0);
	range.setEnd(text.firstChild, 1);

	const rect = range.getBoundingClientRect();

	cursor.style.left = rect.right + "px";
	cursor.style.top = rect.top + "px";
	cursor.style.height = rect.height + "px";

	// type event

	document.addEventListener("keydown", event => {
		// update typed

		if (event.key.length === 1 && quote.text.startsWith(typed)) {
			typed += event.key;
		} else if (event.key === "Backspace") {
			typed = typed.slice(0, -1);
		}

		// update text

		if (quote.text.startsWith(typed)) {
			text.innerHTML = quote.text.replace(
				typed,
				`<span id="correct">${typed}</span>`
			)
		} else {
			const correct = typed.slice(0, -1);
			const last = typed.slice(-1);

			const missed = quote.text.slice(typed.length - 1, typed.length);

			text.innerHTML = quote.text.replace(
				correct + missed,
				`<span id="correct">${correct}</span><span id="missed">${last}</span>`
			)
		}

		// update cursor

		if (!quote.text.startsWith(typed) || typed.length === 0) return;

		const range = document.createRange();
		const correct = text.querySelector("#correct");

		range.setStart(correct.firstChild, typed.length - 1);
		range.setEnd(correct.firstChild, typed.length);
	
		const rect = range.getBoundingClientRect();

		cursor.style.left = `${rect.right}px`;
		cursor.style.top = `${rect.top}px`;
		cursor.style.height = `${rect.height}px`;
	})
});