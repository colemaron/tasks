const inputs = Array.from(document.getElementsByTagName("input"));

const income = document.getElementById("income");
const expenses = document.getElementById("expenses");
const save = document.getElementById("save");

function getFields(parent) {
	return Array.from(parent.children).filter(tag => tag.tagName === "INPUT");
}

function cloneExpense(nameIn, amountIn) {
	const name = document.createElement("p");
	name.textContent = nameIn;

	const amount = document.createElement("input");
	amount.value = amountIn;
	amount.type = "number";

	amount.addEventListener("input", updateValues);

	const remove = document.createElement("button");
	remove.classList.add("remove");
	remove.textContent = "Remove";
	remove.type = "button";

	remove.addEventListener("click", () => {
		name.remove();
		amount.remove();
		remove.remove();

		updateValues();
	})

	expenses.appendChild(name);
	expenses.appendChild(amount);
	expenses.appendChild(remove);

	updateValues();
}

let dollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// add expenses

const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseField = document.getElementById("expense-field");

expenseField.addEventListener("submit", event => {
	event.preventDefault();

	cloneExpense(expenseName.value, Number(expenseAmount.value));
});

// calculate

const monthly = getFields(document.getElementById("monthly"));
const pieKey = document.getElementById("pie-key");
const pie = document.getElementById("pie");

function updateValues() {
	let remaining = income.value;
	let spent = 0;

	// subtract expenses

	const fields = getFields(expenses);
	const percents = [];
	const names = [];

	fields.forEach(expense => {
		spent += Number(expense.value);
	})

	fields.forEach(expense => {
		const percent = Number(expense.value) / spent * 100;

		percents.push(percent);
		names.push(expense.previousElementSibling.textContent);
	})

	remaining -= spent
	remaining -= save.value;

	// calculate values

	const values = [spent, save.value, spent + Number(save.value), remaining];

	for (let i = 0; i < monthly.length; i++) {
		monthly[i].value = dollar.format(values[i]);
	}

	// update pie chart

	let current = 0;
	let styleInner = "";

	// reset pie key

	Array.from(pieKey.children).forEach(key => key.remove());

	// update chart

	for (let i = 0; i < percents.length; i++) {
		// get percents

		const percent = percents[i];

		const start = current;
		const end = current += percent;

		const hue = i / percents.length * 360;
		const color = `hsl(${hue}, 100%, 50%)`

		styleInner += `${color} ${start}%, ${color} ${end}%,`

		// add key

		const amount = dollar.format(percent / 100 * spent);

		const keyName = document.createElement("p");
		keyName.textContent = `${Math.round(percent)}% - ${names[i]} (${amount})`;
		keyName.classList.add("pie-key-value");

		const keyColor = document.createElement("div");
		keyColor.style.backgroundColor = color;

		pieKey.append(keyName);
		keyName.append(keyColor);
	}

	pie.style.backgroundImage = `conic-gradient(${styleInner.slice(0, -1)})`;
}

inputs.forEach(input => {
	input.addEventListener("input", updateValues)
})