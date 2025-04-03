const info = document.getElementById("info");

const card = document.getElementById("card");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

const next = document.getElementById("next");
const back = document.getElementById("back");

function fillCard(data, index) {
	info.textContent = `${index + 1}/${data.length}`;

	question.textContent = data[index].question;
	answer.textContent = data[index].answer;

	question.classList.remove("hidden");
	answer.classList.add("hidden");
}

const flip = [
	[
		{ transform: "rotateX(0deg)" },
		{ transform: "rotateX(90deg)" },
		{ transform: "rotateX(0deg)" },
	],
	{
		duration: 200,
		ease: "ease-in-out"
	}
]

const slideBack = [
	[
		{ transform: "perspective(100px) translateX(-100px) rotateY(3deg)" },
		{ transform: "perspective(100px)" },
	],
	{
		duration: 150,
		easing: "cubic-bezier(0, 0.5, 0.25, 1)",
	}
]

const slideNext = [
	[
		{ transform: "perspective(100px) translateX(100px) rotateY(-3deg)" },
		{ transform: "perspective(100px)" },
	],
	{
		duration: 150,
		easing: "cubic-bezier(0, 0.5, 0.25, 1)"
	}
]

function initCards(data) {
	let index = 0;

	create.style.display = "none";
	card.parentElement.style.display = "flex";

	fillCard(data, index);

	card.addEventListener("click", () => {
		question.classList.toggle("hidden");
		answer.classList.toggle("hidden");

		card.animate(...flip);
	})

	next.addEventListener("click", () => {
		if (index < data.length - 1) {
			index++;
			
			fillCard(data, index);

			card.animate(...slideNext);
		} else {
			card.innerHTML = "All cards reviewed!";
			card.style.fontSize = "2rem";
		}
	})

	back.addEventListener("click", () => {
		if (index > 0) {
			index--;
			
			fillCard(data, index);

			card.animate(...slideBack);
		}
	})
}

// create cards

const create = document.getElementById("create");
const count = document.getElementById("count");

const data = [];

create.addEventListener("submit", event => {
	event.preventDefault();

	const info = new FormData(create);

	const question = info.get("question");
	const answer = info.get("answer");

	count.textContent = `${data.length + 1} cards created`;

	create.question.value = "";
	create.answer.value = "";

	data.push({ question, answer });
});

create.done.addEventListener("click", () => {
	initCards(data);
})