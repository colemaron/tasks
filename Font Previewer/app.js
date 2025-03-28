// api

const key = "AIzaSyDkjOgHdwmrIIsNXTeVC1ws8RjQloTHJE4";
const api = `https://www.googleapis.com/webfonts/v1/webfonts?key=${key}`;

String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1); }
String.prototype.urlify = function() { return this.replace(/\s/g, "+"); }

// load available fonts

async function getFonts(sort, category, query) {
	const url = `${api}&sort=${sort}${category ? `&category=${category}` : ""}`;

	const regex = new RegExp(query, "ig");

	const data = await fetch(url)
		.then(response => response.json())
		.then(data => data.items
			.filter(font => regex.test(font.family))
		);

	return data;
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
}

// load fonts

function loadFonts(fonts) {
	const query = fonts.map(font => `family=${font.family}`).join("&");

	const url = `https://fonts.googleapis.com/css2?${query}`;

	const link = document.createElement("link");

	link.rel = "stylesheet";
	link.href = url;

	document.head.appendChild(link);
}

// load initial fonts

const category = document.getElementById("category-select");

getFonts("date").then( async fonts => {
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

search.addEventListener("input", event => {
	event.preventDefault();

	const data = new FormData(search);

	const sort = data.get("sort");
	const category = data.get("category");
	const query = data.get("query");

	// load fonts

	getFonts(sort, category, query).then(showFonts);
})