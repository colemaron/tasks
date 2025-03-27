const form = document.getElementById("form");

const regex = {
	username: /^[a-z0-9_]{5,15}$/i,
	password: /^(?=.*\d+.*).{8,}$/,
	email:    /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z]+$/i,
	phone:    /^[(]?\d{3}[ )-]*\d{3}[ -]?\d{4}$/,
	card:     /^(?:\d{4}[ -]?){4}$/
	
}

form.addEventListener("input", event => {
	event.preventDefault();

	const data = new FormData(form);

	const entries = Object.fromEntries(data);

	for (const [key, value] of Object.entries(entries)) {
		if (value === "") {
			form[key].classList.remove("error", "success");
		} else if (regex[key].test(value)) {
			form[key].classList.add("success");
			form[key].classList.remove("error");
		} else {
			form[key].classList.add("error");
			form[key].classList.remove("success");
		}
	}
})