// api handling

const keys = {
	weather: "a0502d8e87774528ba1234511251303",
	ip: "2553e257814aa9"
}

const api = {
	weather: `http://api.weatherapi.com/v1`,
	ip: `http://ip-api.com/json?token=${keys.ip}`,
}

const fetchJSON = async url => fetch(url).then(response => response.json());

// get forecasts

async function getWeatherData(location, type) {
	const data = await fetchJSON(`${api.weather}/${type}.json?key=${keys.weather}&q=${location}`);

	return data;
}

// get ip data

async function getIPData() {
	const data = await fetchJSON(api.ip);

	return data;
}

// get location

async function getLocationFromNavigator() {
	return new Promise(resolve => {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			console.log(`Got location within ${Math.round(coords.accuracy * 0.000621371)} miles`);

			const location = `${coords.latitude},${coords.longitude}`

			resolve(location);
		});
	});
}

// weather data

async function updateWeather(q) {
	const data = await getWeatherData(q, "current");
	
	console.log(data);
}

// initilaize weather

async function init() {
	const ip = await getIPData().then(data => data.query);

	updateWeather(ip);
}

init();

// precise location

const preciseLocation = document.getElementById("precise-location");

preciseLocation.addEventListener("click", async () => {
	const location = await getLocationFromNavigator();

	updateWeather(location);
});