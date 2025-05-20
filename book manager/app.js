const books = [];

const title = document.getElementById("title");
const shelf = document.getElementById("shelf");

// add books

const addFront = document.getElementById("add-front");
const addEnd = document.getElementById("add-end");

addFront.addEventListener("click", () => books.unshift(title.value));
addEnd.addEventListener("click", () => books.push(title.value));

// remove books

const removeFront = document.getElementById("remove-front");
const removeEnd = document.getElementById("remove-end");

removeFront.addEventListener("click", () => books.shift());
removeEnd.addEventListener("click", () => books.pop());

// update shelf

const buttons = Array.from(document.querySelectorAll("button"));

for (const button of buttons) {
	button.addEventListener("click", () => {
		shelf.innerHTML = "";

		if (books.length == 0) {
			shelf.innerHTML = "No books added"
		} else {
			shelf.innerHTML = "";

			for (const book of books) {
				const li = document.createElement("li");
				li.textContent = book;
	
				shelf.appendChild(li);
			}
		}
	})
}