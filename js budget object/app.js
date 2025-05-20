const data = {
	income: 0,
	expenses: {
		rent: 0,
		utilities: 10,
		groceries: 220,
		transport: 20,
		entertainment: 0,
		misc: 0
	},
	savingsTarget: 0,

	calculateTotalExpenses() {
		let total = 0;

		for (const key in this.expenses) {
			total += this.expenses[key];
		}

		return total;
	}
}

console.log(data.calculateTotalExpenses());