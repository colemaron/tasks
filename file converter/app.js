// import files

const input = document.getElementById("input");
const drag = document.getElementById("drag");

input.onchange = event => {
	event.preventDefault();

	uploadFiles(event.target.files);
}

drag.onclick = event => {
	event.preventDefault();

	// send input to file upload

	input.click();
}

// drag in files

drag.ondragover = drag.ondragenter = event => {
	event.preventDefault();
};


drag.ondrop = event => {
	event.preventDefault();

	uploadFiles(event.dataTransfer.files);
};

// upload files to list

const files = [];

const uploaded = document.getElementById("uploaded");

function uploadFiles(folder) {
	console.log("uploading");

	for (const file of Array.from(folder)) {
		files.push(file);

		uploaded.innerHTML += `
			<div data-index="${files.length - 1}" class="uploaded-file">
				<p>${file.name}</p>
				<button class="upload-remove list-button">Remove</button>
				<button class="upload-convert list-button">Convert</button>
			</div>
		`;
	}
}

// remove uploaded files

const removeUploaded = document.getElementById("remove-uploaded");

removeUploaded.onclick = event => {
	event.preventDefault();

	files.length = 0;
	uploaded.innerHTML = "";
}

// select convert to

let extension = "jpg";

const extensions = document.getElementsByClassName("ext");

for (const button of extensions) {
	button.onclick = event => {
		event.preventDefault();
		
		for (const item of extensions) {
			item.classList.remove("selected");
		}

		extension = button.textContent;
		button.classList.add("selected");
	}
}

// convert files and add to list

const converted = [];

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

async function convertFile(file) {
	const name = file.name.slice(0, file.name.indexOf("."));

	// convert image extension

	const bitmap = await createImageBitmap(file);
	
	canvas.width = bitmap.width;
	canvas.height = bitmap.height;
	ctx.drawImage(bitmap, 0, 0);

	const convertedPath = canvas.toDataURL(`image/${extension}`);

	// add to converted

	converted.push({name: `${name}.${extension}`, path: convertedPath});

	// add file to converted list
	
	completed.innerHTML += `
		<div data-index="${converted.length - 1}" class="uploaded-file">
			<p>${name}.${extension}</p>
			<button class="convert-remove list-button">Remove</button>	
			<button class="convert-download list-button">Download</button>
		</div>
	`;
}

// convert all files

const convert = document.getElementById("convert");
const completed = document.getElementById("completed");

convert.onclick = async event => {
	event.preventDefault();

	for (const file of files) {
		convertFile(file);
	}
}

// remove all converted

const removeConverted = document.getElementById("remove-converted");

removeConverted.onclick = event => {
	event.preventDefault();

	converted.length = 0;
	completed.innerHTML = "";
}

// download files

const download = document.getElementById("download");

const anchor = document.createElement("a");

function downloadFile(file) {
	anchor.setAttribute("download", file.name);
	anchor.setAttribute("href", file.path);

	anchor.click();
}

download.onclick = event => {
	event.preventDefault();

	for (const file of converted) {
		downloadFile(file);
	}
}

// dynamic buttons

document.onclick = async event => {
	const target = event.target;

	const index = target.parentElement.dataset.index || -1;

	// remove uploaded file

	if (target.classList.contains("upload-remove")) {
		files.splice(index, 1);
		target.parentElement.remove();
	}

	// convert uploaded file

	if (target.classList.contains("upload-convert")) {
		converted.push(await convertFile(files[index]));
	}

	// remove converted file

	if (target.classList.contains("convert-remove")) {
		converted.splice(index, 1);
		target.parentElement.remove();
	}

	// download converted file

	if (target.classList.contains("convert-download")) {
		downloadFile(converted[index]);
	}
}