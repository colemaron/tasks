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

const observer = new IntersectionObserver( async (entries, observer) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			const element = entry.target;
			const font = element.dataset.font;

			const formatted = font.replace(/\+/g, " ");

			loadFont(formatted);

			observer.unobserve(element);
		}
	}
}, { root: results, threshold: 0 } );

// create font element

const template = document.getElementById("font-template");

function createFontElement(font) {
	const clone = template.content.cloneNode(true);
	const container = clone.firstElementChild;

	[ family, sample ] = container.children;

	sample.style.fontFamily = font.family;
	family.textContent = font.family;
	sample.textContent = preview.value;

	results.appendChild(clone);
}

// create elements

fetchFonts().then(fonts => {
	fonts.forEach(font => createFontElement(font));
});

// update samples

preview.addEventListener("input", () => {
	const samples = document.querySelectorAll(".sample");

	for (const sample of samples) {
		sample.textContent = preview.value;
	}
})