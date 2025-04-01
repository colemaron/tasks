async function fetchQuestions() {
	const data = await fetch("./data.json").then(response => response.json());

	return data;
}

const form = document.getElementById("form");
const bank = document.getElementById("bank");
const options = document.getElementById("options");

fetchQuestions().then(data => {
	data.forEach((item, index) => {
		// create drop question

		const question = document.createElement("div");
		question.classList.add("question");

		const questionText = document.createElement("p");
		questionText.textContent = item.question;
		question.appendChild(questionText);

		options.appendChild(question);

		// create drag answer

		const answer = document.createElement("div");
		answer.classList.add("answer");
		answer.draggable = true;
		answer.id = index;

		const answerText = document.createElement("p");
		answerText.textContent = item.answer;
		answer.appendChild(answerText);

		bank.appendChild(answer);
	})

	// drag start

	bank.querySelectorAll(".answer").forEach(answer => {
		answer.addEventListener("dragstart", event => {
			event.dataTransfer.setData("text/plain", event.target.id);
		})
	})

	// go back to bank

	document.addEventListener("dragend", event => {
		const status = event.dataTransfer.dropEffect;

		if (status === "none") {
			bank.appendChild(event.target);
		}
	})

	bank.addEventListener("dragover", event => {
		event.preventDefault();
	})

	bank.addEventListener("drop", event => {
		const id = event.dataTransfer.getData("text/plain");
		const answer = document.getElementById(id);

		bank.appendChild(answer);
	})

	// drop in question

	options.querySelectorAll(".question").forEach(question => {
		question.addEventListener("dragover", event => {
			event.preventDefault();
		});

		question.addEventListener("drop", event => {
			event.preventDefault();

			const id = event.dataTransfer.getData("text/plain");
			const answer = document.getElementById(id);

			const old = question.querySelector(".answer");

			if (old) {
				bank.appendChild(old);
			}

			question.appendChild(answer);
		})
	})
})