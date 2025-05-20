const result = document.getElementById("result");

function applyDiscount(t) {
	if (t >= 100) {
		return t * 0.20;
	} else if (t >= 75) {
		return t * 0.15;
	} else if (t >= 50) {
		return t * 0.10;
	} else if (t >= 25) {
		return t * 0.05;
	} else {
		return 0;
	}
}

function calculateCart() {
	result.innerHTML = "";

	const data = [];

	[1, 2].forEach(i => data.push({
		name: document.getElementById(`name${i}`).value,
		price: document.getElementById(`price${i}`).value,
		quantity: document.getElementById(`quantity${i}`).value,
		index: i
	}))

	data.forEach(item => result.innerHTML += `<p>${item.name}: $${(item.price * item.quantity).toFixed(2)}</p>`)

	const sum = data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
	const discount = applyDiscount(sum);
	const applied = (discount / sum) * 100;
	const total = (sum - discount).toFixed(2);

	result.innerHTML += `<hr>`;
	result.innerHTML += `<p>Total: $${total}</p>`;
	result.innerHTML += `<hr>`;
	result.innerHTML += `<p>Applied: ${applied.toFixed(2)}%</p>`;
	result.innerHTML += `<p>Saved: $${discount.toFixed(2)}</p>`;
}