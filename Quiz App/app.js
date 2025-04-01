const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function loadQuestions() {
	const data = await fetch("./questions.json").then(response => response.json());

	return data;
}

function fillQuestion(data, index, score) {
	// set question

	const question = document.getElementById("question");
	question.textContent = `Question ${index + 1}/${data.length}: ${data[index].question}`;

	// set info

	const info = document.getElementById("score");
	info.textContent = `Score: ${score}/${data.length}`;

	// add choices

	const choices = document.getElementById("choices");

	while (choices.firstChild) {
		choices.removeChild(choices.firstChild);
	}

	data[index].choices.forEach((choice, i) => {
		const id = i + 1;

		const div = document.createElement("div");
		div.classList.add("choice");

		const input = document.createElement("input");
		input.type = "radio";
		input.name = "choice";
		input.value = input.id = id;
		div.appendChild(input);

		const label = document.createElement("label");
		label.setAttribute("for", id);
		label.textContent = `${alpha[i]}) ${choice}`;
		div.appendChild(label);

		choices.appendChild(div);
	})

	// set feedback

	const feedback = document.getElementById("feedback");
	feedback.textContent = "";
}

loadQuestions().then(data => {
	let index = 0;
	let score = 0;

	const form = document.getElementById("form");

	fillQuestion(data, index, score);

	form.addEventListener("change", event => {
		const correct = form.querySelector(".correct");

		if (correct) {
			correct.firstChild.checked = true;
			
			return;
		}

		const entries = new FormData(form);
		const choice = entries.get("choice");

		const element = event.target.closest(".choice");

		if (choice == data[index].correct) {
			element.classList.add("correct");

			if (!form.querySelector(".incorrect")) {
				score++;
			}
		} else {
			element.classList.add("incorrect");

			const feedback = document.getElementById("feedback");
			feedback.textContent = data[index].feedback;
		}
	})

	form.addEventListener("submit", event => {
		event.preventDefault();

		const entries = new FormData(form);
		const choice = entries.get("choice");

		if (choice && choice == data[index].correct && index < data.length - 1) {
			fillQuestion(data, ++index, score);
		} else if (index >= data.length - 1) {
			while (form.firstChild) {
				form.removeChild(form.firstChild);
			}

			form.style.alignItems = "center";

			const results = document.createElement("p");
			results.textContent = `You scored ${score}/${data.length} and got ${score * 100 / data.length}%`;

			form.appendChild(results);
		}
	})
})