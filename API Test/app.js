const url = 'https://steamwebapi1.p.rapidapi.com/steam/api/items?game=rust';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8f9275b32bmshdb49004967e719cp1a5b1fjsn603b265123dd',
		'x-rapidapi-host': 'steamwebapi1.p.rapidapi.com'
	}
};

async function fetchData() {
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

fetchData();