// script.js
const apiKey = '9bbbd14d97f2095956530386dd878dfc';

// A function to populate the city select element with options
function populateCityOptions() {
    const cities = ['Bangkok', 'London', 'New York', 'Tokyo', 'Paris'];
    const citySelect = document.getElementById('city');

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

// Call the function to populate city options
populateCityOptions();

document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please select a city.');
        return;
    }

    // Geocoding API URL
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(geocodingUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Geocoding API error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(locationData => {
            if (locationData.length > 0) {
                const lat = locationData[0].lat;
                const lon = locationData[0].lon;
                const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;

                return fetch(weatherApiUrl);
            } else {
                throw new Error('City not found in Geocoding API');
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.current) {
                document.getElementById('temperature').innerText = `Temperature: ${data.current.temp} °C`;
                document.getElementById('humidity').innerText = `Humidity: ${data.current.humidity} %`;
                document.getElementById('windSpeed').innerText = `Wind Speed: ${data.current.wind_speed} m/s`;
            } else {
                throw new Error('Weather data not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('temperature').innerText = error.message;
            document.getElementById('humidity').innerText = '';
            document.getElementById('windSpeed').innerText = '';
        });
});
