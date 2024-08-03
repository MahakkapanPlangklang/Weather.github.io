const apiKey = '9bbbd14d97f2095956530386dd878dfc';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const cityCoordinates = {
    "London": { lat: 51.5074, lon: -0.1278 },
    "New York": { lat: 40.7128, lon: -74.0060 },
    "Tokyo": { lat: 35.6762, lon: 139.6503 },
    "Sydney": { lat: -33.8688, lon: 151.2093 },
    "Paris": { lat: 48.8566, lon: 2.3522 }
};

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('กรุณาเลือกเมือง');
        return;
    }

    const { lat, lon } = cityCoordinates[city];
    
    try {
        
        const weatherResponse = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
        
        if (weatherData.cod !== 200) {
            document.getElementById('weather-info').innerText = `ข้อผิดพลาด: ${weatherData.message}`;
            return;
        }

        const { main, wind } = weatherData;
        document.getElementById('weather-info').innerHTML = `
            <h2>สภาพอากาศใน ${city}</h2>
            <p>อุณหภูมิ: ${main.temp} °C</p>
            <p>ความชื้น: ${main.humidity} %</p>
            <p>ความเร็วลม: ${wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById('weather-info').innerText = `ข้อผิดพลาด: ${error.message}`;
    }
}
