document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const cityCoords = document.getElementById('city').value.split(',');
    const lat = cityCoords[0];
    const lon = cityCoords[1];
    const apiKey = '9bbbd14d97f2095956530386dd878dfc'; 
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.current) {
                document.getElementById('temperature').innerText = `Temperature: ${data.current.temp} °C`;
                document.getElementById('humidity').innerText = `Humidity: ${data.current.humidity} %`;
                document.getElementById('windSpeed').innerText = `Wind Speed: ${data.current.wind_speed} m/s`;
            } else {
                document.getElementById('temperature').innerText = 'City not found';
                document.getElementById('humidity').innerText = '';
                document.getElementById('windSpeed').innerText = '';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('temperature').innerText = 'Error fetching data';
            document.getElementById('humidity').innerText = '';
            document.getElementById('windSpeed').innerText = '';
        });
});
