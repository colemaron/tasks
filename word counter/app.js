const input = document.getElementById("input");
const info = document.getElementById("info");

String.prototype.__defineGetter__("words", function() {
	const words = this.split(/\s+/).filter(word => word !== "");

	return words.length;
});

String.prototype.__defineGetter__("sentences", function() {
	const regex = /(?<!\.)[.!?]+(?!\.)/g;
	const matches = this.match(regex);

	return matches ? matches.length : 0;
});

String.prototype.__defineGetter__("paragraphs", function() {
	const regex = /\n{2,}/g;
	const matches = this.split(regex);

	return matches.length;
});

input.addEventListener("input", event => {
	event.preventDefault();

	const text = input.value;

	info.innerHTML = `
		<li>Characters: ${text.length}</li>
		<li>Words: ${text.words}</li>
		<li>Sentences: ${text.sentences}</li>
		<li>Paragraphs: ${text.paragraphs}</li>
	`;
});