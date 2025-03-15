// api

const key = "AIzaSyDkjOgHdwmrIIsNXTeVC1ws8RjQloTHJE4";
const api = `https://www.googleapis.com/webfonts/v1/webfonts?key=${key}`;

// fetch json

const fetchJSON = async url => fetch(url).then(response => response.json());

// fetch google fonts

const fetchFonts = async sort => await fetchJSON(`${api}&sort=${sort}`);

// search fonts

const searchForm = document.getElementById("search-form");
const fontResults = document.getElementById("results");

const preview = document.getElementById("preview");

async function searchFonts() {
	const data = new FormData(searchForm);

	const query = data.get("query").toLowerCase();
	const sort = data.get("sort");

	fontResults.textContent = "Loading...";

	const fonts = await fetchFonts(sort).then(data => data.items);
	const results = fonts.filter(font => font.family.toLowerCase().includes(query));

	while (fontResults.firstChild) {
		fontResults.removeChild(fontResults.firstChild);
	}

	if (results.length > 0) {
		for (const font of results) {
			const div = document.createElement("div");
			div.classList.add("font");
	
			// add family name
	
			const family = document.createElement("h4");
			family.classList.add("family");
			family.textContent = font.family;
	
			div.appendChild(family);
	
			// add example text
	
			const sample = document.createElement("p");
			sample.classList.add("sample");

			sample.style.fontFamily = font.files.regular;
			sample.textContent = preview.value;
	
			div.appendChild(sample);
	
			// add font
	
			fontResults.appendChild(div);
		}
	} else {
		fontResults.textContent = `No results for ${query}`;
	}
}

// update results

searchForm.addEventListener("submit", event => event.preventDefault());
searchForm.addEventListener("input", searchFonts);

searchFonts();

// appl preview

preview.addEventListener("input", () => {
	const samples = document.querySelectorAll(".sample");

	for (const sample of samples) {
		sample.textContent = preview.value;
	}
})