const apiKey = "da79ae3a2842e849e68c1d10ce582a23";

function getWeather() {
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
        saveSearchHistory(data);
    })
    .catch(error => alert("Please enter a valid city name!"));
}

function displayWeather(data) {
    const weatherCards = document.getElementById("weather-cards");
    weatherCards.innerHTML = "";

    const weatherList = data.list;
    for (let i = 0; i < weatherList.length; i+=8) {
        const weather = weatherList[i];
        const date = new Date(weather.dt * 1000);
        const day = date.toLocaleDateString("en-US", {weekday: "long"});
        const time = date.toLocaleTimeString("en-US", {hour: "numeric"});

        const temp = Math.round(weather.main.temp - 273.15);
        const description = weather.weather[0].description;

        const card = document.createElement("div");
        card.classList.add("card");

        const cardContent = 
            `<h2>${day}, ${time}</h2>
            <p>${description}</p>
            <p>${temp} &deg;C</p>`;
        ;
        card.innerHTML = cardContent;

        weatherCards.appendChild(card);
    }
}

function saveSearchHistory(data) {
    const searchHistory = document.getElementById("search-history");

    const city = data.city.name;
    const country = data.city.country;
    const date = new Date().toLocaleDateString("en-US");

    const searchHistoryContent = `
        <p>${city}, ${country} - ${date}</p>`;

    searchHistory.innerHTML += searchHistoryContent;
}