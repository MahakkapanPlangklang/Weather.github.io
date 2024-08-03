// script.js
const apiKey = '9bbbd14d97f2095956530386dd878dfc';

// A function to populate the city select element with options
function populateCityOptions() {
    const cities = [
        { name: 'London', lat: 51.509865, lon: -0.118092 },
        { name: 'New York', lat: 40.712776, lon: -74.005974 },
        { name: 'Tokyo', lat: 35.689487, lon: 139.691711 },
        { name: 'Paris', lat: 48.856613, lon: 2.361844 },
        { name: 'Bangkok', lat: 13.756331, lon: 100.501762 }
    ];
    const citySelect = document.getElementById('city');

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = JSON.stringify({ lat: city.lat, lon: city.lon });
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

// Call the function to populate city options
populateCityOptions();

document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const cityData = JSON.parse(document.getElementById('city').value);
    const { lat, lon } = cityData;

    // Weather overview API URL
    const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('weatherOverview').innerText = data.weather_overview || 'No weather overview available';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('weatherOverview').innerText = 'Error fetching data';
        });
});
