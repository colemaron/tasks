// api

const key = "AIzaSyDkjOgHdwmrIIsNXTeVC1ws8RjQloTHJE4";
const api = `https://www.googleapis.com/webfonts/v1/webfonts?key=${key}`;

// fetch fonts

let fonts = [];

async function fetchFonts(sort = "alpha", category = "all", subset = "all") {
	const url = `${api}&sort=${sort}`;
	const response = await fetch(url).then(response => response.json());

	let final = response.items;

	if (category !== "all") {
		final = final.filter(font => font.category === category);
	}

	if (subset !== "all") {
		final = final.filter(font => font.subsets.includes(subset));
	}

	return fonts = final;
}

// load font

const loaded = new Set();

async function loadFonts(fonts) {
	// check if already loaded then add loading ones

	const filtered = fonts.filter(font => !loaded.has(font.family));

	if (filtered.length === 0) return;

	filtered.forEach(font => loaded.add(font.family));

	// load fonts

	const query = fonts.map(({ family }) => `family=${family.replace(/\s/g, "+")}`).join("&");
	const url = `https://fonts.googleapis.com/css2?${query}`;

	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = url;

	document.head.appendChild(link);
}

// update elements

const preview = document.getElementById("preview-form");
const results = document.getElementById("results");

preview.addEventListener("input", event => {
	event.preventDefault();

	const data = new FormData(preview);

	const text = data.get("text");

	results.querySelectorAll(".preview").forEach(preview => preview.textContent = text);
});

// create font element

function createFontElement(font) {
	const template = document.getElementById("font-template");
	const clone = template.content.cloneNode(true);

	clone.querySelector(".family").textContent = font.family;

	const text = clone.querySelector(".preview");
	text.style.fontFamily = font.family;
	text.style.fontSize = "36px";
	text.textContent = preview.text.textContent;

	results.appendChild(clone);
}

// get possible values

const keys = ["category", "subsets"]

async function getUniqueValues() {
	const unique = {};

	for (const key of keys) {
		unique[key] = [...new Set(fonts.flatMap(font => font[key]))].sort();
	}

	return unique;
}

// fill options

const filters = document.getElementById("filter-form");

fetchFonts().then( async fonts => {
	// create all font elements
	
	fonts.forEach(createFontElement);

	// fill filters with possible values

	const values = getUniqueValues();

	for (const [filter, possible] of Object.entries(values)) {
		for (const value of possible) {
			const option = document.createElement("option");

			option.value = value;
			option.textContent = value[0].toUpperCase() + value.slice(1);

			filters[filter].appendChild(option);
		}
	}
});