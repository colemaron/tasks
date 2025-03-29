// api

const key = "AIzaSyDkjOgHdwmrIIsNXTeVC1ws8RjQloTHJE4";
const api = `https://www.googleapis.com/webfonts/v1/webfonts?key=${key}`;

String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1); }
String.prototype.urlify = function() { return this.replace(/\s/g, "+"); }
String.prototype.search = function() { return this.replace(/\s/g, "%20"); }
String.prototype.has = function(other) { return this.toLowerCase().includes(other.toLowerCase()); }

// load available fonts

let fonts = [];

async function fetchFonts(sort) {
	const url = `${api}&sort=${sort}`;

	fonts = await fetch(url)
		.then(response => response.json())
		.then(data => data.items);

	return fonts;
}

// create font element

const template = document.getElementById("font-template");

function createFontElement(font) {
	const clone = template.content.cloneNode(true);

	clone.querySelector(".family").textContent = font.family;

	const preview = clone.querySelector(".preview");
	preview.textContent = "The quick brown fox jumped over the lazy dog";
	preview.style.fontFamily = font.family;

	results.appendChild(clone);
}

// show fonts

const results = document.getElementById("results");

function showFonts(fonts) {
	// remove old results

	results.querySelectorAll(".font").forEach(font => font.remove());

	// add new results

	fonts.forEach(createFontElement);

	results.querySelectorAll(".font").forEach(font => observer.observe(font));
}

// load fonts

async function loadFont(family, text) {
	const url = `https://fonts.googleapis.com/css2?family=${family}&text=${text.search()}&display=block.xhr`;

	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = url;

	document.head.appendChild(link);
}

// load on scroll

const observer = new IntersectionObserver( async entries => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			const element = entry.target;

			const family = element.querySelector(".family").textContent;
			const text = "The quick brown fox jumped over the lazy dog";

			loadFont(family, text);
		}
	}
}, { root: results, threshold: 0 });

// load initial fonts

const category = document.getElementById("category-select");

fetchFonts("trending").then( async fonts => {
	showFonts(fonts);

	// add possible categories

	const categories = new Set(fonts.map(font => font.category));

	for (const value of categories) {
		const option = document.createElement("option");

		option.value = value;
		option.textContent = value.capitalize();

		category.appendChild(option);
	}
})

// search fonts

const search = document.getElementById("search-form");

search.addEventListener("submit", event => event.preventDefault());

function updateResults() {
	const data = new FormData(search);

	const category = data.get("category");
	const query = data.get("query");

	const filtered = fonts.filter(font => (font.category === category || category === "all") && font.family.has(query))

	showFonts(filtered);
}

search.sort.addEventListener("change", () => {
	fetchFonts(search.sort.value).then(updateResults);
});

search.addEventListener("input", updateResults);