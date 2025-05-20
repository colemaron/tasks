const unitOne = document.getElementById("unit-one");
const unitTwo = document.getElementById("unit-two");

const input = document.getElementById("input");
const output = document.getElementById("output");

const type = document.getElementById("type");

const from = document.getElementById("from");
const to = document.getElementById("to");

// conversion factors

const units = {
	length: {
		"Metric": "separator",

		mm: {name: "millimeter",  factor: 0.001},
		cm: {name: "centimeters", factor: 0.01},
		m:  {name: "meters",      factor: 1},
		km: {name: "kilometers",  factor: 1000},

		"Imperial": "separator",

		th: {name: "thousandths", factor: 2.54e-5},
		in: {name: "inches",      factor: 0.0254},
		ft: {name: "feet",        factor: 0.3048},
		yd: {name: "yards",       factor: 0.9144},
		mi: {name: "miles",       factor: 1609.34},

		"Random": "separator",

		ly: {name: "lightyear", factor: 9.461e+15},
	},

	volume: {
		"Metric Cubed": "separator",

		"mm³": {name: "millimeters³", factor: 1e-9},
		"cm³": {name: "centimeters³", factor: 1e-6},
		"m³":  {name: "meters³",      factor: 1},
		"km³": {name: "kilometers³",  factor: 1e+9},

		"Imperial Cubed": "separator",

		"th³": {name: "thousandths³", factor: 1.63871e-14},
		"in³": {name: "inches³",      factor: 1.63871e-5},
		"ft³": {name: "feet³",        factor: 0.0283168},
		"yd³": {name: "yards³",       factor: 0.764555},
		"mi³": {name: "miles³",       factor: 4.168e+9},

		"Metric Fluids": "separator",

		mL: {name: "milliliters", factor: 0.000001},
		L:  {name: "liters",      factor: 0.001},

		"Imperial Fluids": "separator",

		gal:  {name: "gallons",      factor: 0.0037854118},
		qt:   {name: "quarts",       factor: 0.0009463529},
		pt:   {name: "pints",        factor: 0.0004731765},
		cup:  {name: "cups",         factor: 0.0002365882},
		tbsp: {name: "tablespoons",  factor: 0.0000147868},
		tsp:  {name: "teaspoons",    factor: 0.0000049289},
		oz:   {name: "fluid Ounces", factor: 0.0000295735},
		bbl:  {name: "barrel",       factor: 0.1192404712},

		"Random": "separator",

		"ly³": {name: "lightyears³", factor: 8.468e+47},
	},

	temperature: {
		"°C": {name: "celcius",    factor: 274.15},
		"°F": {name: "fahrenheit", factor: 255.92777778},
		"°K": {name: "kelvin",     factor: 1}
	},
}

// calculate and update result

let result = 0;

function update() {
	const value = input.value;
	let u1 = unitOne.value;
	let u2 = unitTwo.value;

	from.textContent = `From: (${u1})`;
	to.textContent = `To: (${u2})`;

	if (value) {
		const values = units[type.value];
		result = value * values[u1].factor / values[u2].factor;

		output.value = `${input.value} ${u1} = ${result} ${u2}`;
	} else {
		output.value = "";
	}
}

update();

// input detection

input.addEventListener("input", update);
unitOne.addEventListener("input", update);
unitTwo.addEventListener("input", update);

// copy result

const copy = document.getElementById("copy");

copy.addEventListener("click", () => {
	navigator.clipboard.writeText(result); // copy result

	copy.textContent = "Copied result!";

	setTimeout(() => {copy.textContent = "Copy"}, 1000);
})

// type changing

function addOptions(parent) {
	const array = units[type.value];

	// remove current options

	Array.from(parent.children).forEach(option => {
		option.remove();
	})

	// insert correct options

	const keys = Object.keys(array);
	const keysNoSeparators = keys.filter(key => array[key] !== "separator");
	const longest = Math.max(...keysNoSeparators.map(key => key.length));

	for (let i = 0; i < keys.length; i++) {
		const unit = keys[i];
		const values = array[unit];

		const option = document.createElement("option");

		if (values === "separator") {
			option.textContent = `════ ${unit} ════`;
			option.disabled = true;
		} else {
			const name = array[unit].name;
			const gap = longest + 1 - unit.length
			const whitespace = "—".repeat(gap);

			option.textContent = `${unit} ${whitespace} ${name}`;
			option.value = unit;
		}
		
		parent.appendChild(option);

		if (i === 1) {
			option.selected = true;
		}
	}
}

// update options on type change

function addBothOptions() {
	addOptions(unitOne);
	addOptions(unitTwo);

	update();
}

addBothOptions();

type.addEventListener("input", addBothOptions);