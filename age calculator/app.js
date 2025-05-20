const input = document.getElementById("dob");

const age = document.getElementById("age");
const until = document.getElementById("until");

function calculate() {
	if (input.value) {
		const dob = new Date(input.value);
		const now = new Date();

		const dif = new Date(now - dob);

		const times = {
			years: dif.getFullYear() - 1970,
			months: dif.getMonth(),
			days: dif.getDate() - 1,
			hours: dif.getHours(),
			minutes: dif.getMinutes(),
			seconds: dif.getSeconds(),
			milliseconds: dif.getMilliseconds()
		}

		age.textContent = Object.entries(times).map(([unit, value]) => `${value} ${unit}`).join(" ");
	}

	window.requestAnimationFrame(calculate);
}

window.requestAnimationFrame(calculate);