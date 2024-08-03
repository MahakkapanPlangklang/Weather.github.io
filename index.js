document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = '9bbbd14d97f2095956530386dd878dfc'; // แทนที่ YOUR_API_KEY ด้วย API Key ของคุณ
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
                document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity} %`;
                document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
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