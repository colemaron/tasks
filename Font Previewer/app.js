// api

const key = "AIzaSyDkjOgHdwmrIIsNXTeVC1ws8RjQloTHJE4";
const api = `https://www.googleapis.com/webfonts/v1/webfonts?key=${key}`;

// fetch fonts

async function fetchFonts(sort = "trending") {
	const url = `${api}&sort=${sort}`;
	const response = await fetch(url).then(response => response.json());

	return response.items;
}

// load font

async function loadFont(font) {
	const url = `https://fonts.googleapis.com/css?family=${font}`;

	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = url;

	document.head.appendChild(link);
}

// scroll observer

const observer = new IntersectionObserver((entries, observer) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			const element = entry.target;
			const font = element.dataset.font;

			loadFont(font.replace(/\s+/g, "+"));

			observer.unobserve(element);
		}
	}
}, { root: results, threshold: 0 } );

// create font element

function createFontElement(font) {
	// main font element

	const div = document.createElement("div");
	div.dataset.font = font.family;
	div.classList.add("font")

	// font family name

	const h4 = document.createElement("h4");
	h4.textContent = font.family;

	// sample text
	
	const sample = document.createElement("p");
	sample.style.fontFamily = font.family;
	sample.textContent = preview.value;
	sample.classList.add("sample");

	// download

	const a = document.createElement("a");
	a.textContent = "Download";
	a.href = font.files.regular;
	a.classList.add("download");

	// append children
	
	div.appendChild(h4);
	div.appendChild(sample);
	div.appendChild(a);

	return div;
}

// create elements

fetchFonts().then(fonts => {
	for (const font of fonts) {
		const element = createFontElement(font);

		results.appendChild(element);
		observer.observe(element);
	}
});

// update samples

preview.addEventListener("input", () => {
	const samples = document.querySelectorAll(".sample");

	for (const sample of samples) {
		sample.textContent = preview.value;
	}
})

// search fonts

const form = document.getElementById("search-form");

form.addEventListener("input", event => {
	event.preventDefault();

	// get form values

	const data = new FormData(form);
	const query = data.get("query").toLowerCase();

	const sort = data.get("sort");

	// clear results

	results.innerHTML = "";
	
	// filter results

	fetchFonts(sort).then(fonts => {
		const filtered = fonts.filter(font => font.family.toLowerCase().includes(query));

		for (const font of filtered) {
			const element = createFontElement(font);

			results.appendChild(element);
			observer.observe(element);
		}
	})
});