const cellContainer = document.getElementById("cell-container");
const cellTemplate = document.getElementById("cell-template");

const difficulty = 0.2;
const sizeX = 25;
const sizeY = 25;

const cells = [];
const mines = [];

// clone template function

function cloneTemplate(template, container) {
	const clone = document.importNode(template.content, true);
	container.appendChild(clone);

	return container.lastElementChild;
}

// create board

function createBoard() {
	cellContainer.style.gridTemplateColumns = `repeat(${sizeX}, 1fr)`;

	for (let y = 0; y < sizeY; y++) {
		for (let x = 0; x < sizeX; x++) {
			const cell = cloneTemplate(cellTemplate, cellContainer);

			cells.push(cell);
		}
	}
}

createBoard();

// update cell function

function updateCell(cell) {
	const status = cell.dataset.status;

	if (status === "cleared") {
		cell.style.backgroundColor = "lightgray";
	} else if (status === "flagged") {
		cell.style.backgroundColor = "red";
	} else if (status === "hidden") {
		cell.style.backgroundColor = "white";
	} else if (status === "boom") {
		cell.style.backgroundColor = "black";
	}
}

// get cell

function getCell(x, y) {
	return cells[y * sizeX + x];
}

// get neighbors

function getNeighbors(cell) {
	const neighbors = [];

	const n = cells.indexOf(cell);

	const x = n % sizeX;
	const y = Math.floor(n / sizeX);

	// get neighbors

	for (let dy = -1; dy <= 1; dy++) {
		for (let dx = -1; dx <= 1; dx++) {
			const cx = dx + x;
			const cy = dy + y;

			if (cx < 0 || cy < 0 || cx >= sizeX || cy >= sizeY) {
				continue;
			}

			neighbors.push(getCell(cx, cy));
		}
	}

	return neighbors;
}

// is mine function

function isMine(cell) {
	const index = cells.indexOf(cell);

	return mines.includes(index);
}

// get mine count

function getMineCount(cell) {
	const neighbors = getNeighbors(cell);

	let mineCount = 0;

	neighbors.forEach(neighbor => {
		if (isMine(neighbor)) {
			mineCount++;
		}
	})

	return mineCount;
}

// clear cell function

function clearCell(cell) {
	if (!isMine(cell)) {
		cell.dataset.status = "cleared";
	}

	updateCell(cell);
}

// clear neighbors

function clearNeighbors(cell) {
	const neighbors = getNeighbors(cell);

	neighbors.forEach(neighbor => {
		const mines = getMineCount(neighbor);
		const status = neighbor.dataset.status;

		if (!isMine(neighbor) & getMineCount(neighbor) > 0) {
			neighbor.textContent = mines;
		} else {
			cell.dataset.status = "boom";
		}

		if (status === "hidden") {
			clearCell(neighbor);

			if (mines === 0) {
				clearNeighbors(neighbor);
			}
		}
	})
}

// board interaction

let firstClick = true;

cellContainer.addEventListener("click", event => {
	const cell = event.target;

	if (firstClick) {
		firstClick = false;

		for (let i = 0; i < cells.length; i++) {
			const current = cells.indexOf(cell);

			if (i !== current & Math.random() < difficulty) {
				mines.push(i);
			}
		}
	}

	const status = cell.dataset.status;

	if (status !== "cleared" & status !== "boom") {
		if (event.ctrlKey) {
			if (status === "flagged") {
				cell.dataset.status = "hidden";
			} else {
				cell.dataset.status = "flagged";
			}
	
			updateCell(cell);
		} else if (isMine(cell) & status !== "flagged") {
			cell.dataset.status = "boom";

			updateCell(cell);
		} else if (status === "hidden") {
			clearCell(cell);
			clearNeighbors(cell);
		}
	}
})