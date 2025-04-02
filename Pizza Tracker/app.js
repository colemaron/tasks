const progress = document.getElementById("progress");

const pizzaTime = 0.25 * 60 * 1000;

const intervals = {
	"Preparing...": { start: 0, description: "We have started preparing your pizza." },
	"Starting delivery": { start: 15, description: "Preparing for delivery..." },
	"Delivering...": { start: 25, description: "Your pizza is now on its way!" },
	"Halfway there!": { start: 50, description: "Halfway there!" },
	"Your pizza has arrived!": { start: 100, description: "Your pizza has arrived at your doorstep!" }
}

// add intervals

const values = Object.values(intervals);
let columns = "";

for (let i = 0; i < values.length; i++) {
	const point = document.createElement("div");
	point.style.position = "relative";

	point.insertAdjacentHTML("afterbegin", `
		<span style="
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			font-family: monospace;
			font-size: 1rem;
			border-radius: 50%;
			width: 2rem;
			height: 2rem;
			background-color: red;
			translate: -50% 0;
		">${i + 1}</span>
	`);

	progress.appendChild(point);

	if (i > 0) {
		const width = values[i].start - values[i - 1].start;

		columns += `${width}fr `;
	} else {
		columns += "0fr ";
	}
}

console.log(columns);

progress.style.gridTemplateColumns = columns;

// load bar

const info = document.getElementById("info");
const updates = document.getElementById("updates");

let reached = -1;

function startDelivery() {
	const startTime = Date.now();

	setInterval(() => {
		const time = Date.now() - startTime;
		const percent = time / pizzaTime * 100;
	
		for ([key, value] of Object.entries(intervals)) {
			if (percent > value.start && reached < value.start) {
				info.textContent = key;

				const update = document.createElement("div");	
				update.classList.add("update");			
				updates.appendChild(update);

				const updateTime = document.createElement("p");
				updateTime.textContent = new Date().toLocaleTimeString();
				update.appendChild(updateTime);

				const description = document.createElement("p");
				description.textContent = value.description;
				update.appendChild(description);

				reached = value.start;
			}
		}
	
		progress.style.background = `linear-gradient(to right, black, black ${percent}%, transparent ${percent}%)`;
	}, 10);

	return new Date(startTime);
}

// delivery 

const start = document.getElementById("start");
const time = document.getElementById("time");

start.addEventListener("click", event => {
	const startTime = startDelivery();

	time.textContent = `Placed order at ${startTime.toLocaleTimeString()}`;
})