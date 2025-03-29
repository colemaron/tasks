const symbols = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+",
    "[", "]", "{", "}", "\\", "|", ";", ":", "'", "\"", ",", "<", ".", ">", "/", "?"
];

window.addEventListener("keydown", event => {
	if (symbols.includes(event.key)) {
		console.log(event.key);
	}
})