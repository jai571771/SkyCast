const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const readline = require('readline');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch weather data from OpenWeatherMap API
 * @param {string} city 
 * @param {string} country 
 * @returns {Promise<object>}
 */
async function fetchWeather(city, country) {
    try {
        const query = country ? `${city},${country}` : city;
        const response = await axios.get(BASE_URL, {
            params: {
                q: query,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error fetching weather data');
        }
        throw new Error('Network error or invalid API key');
    }
}

// HTTP Server Logic
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Serve index.html
    if (pathname === '/' || pathname === '/index.html') {
        fs.readFile(path.join(__dirname, '..', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }

    // Weather API Route
    if (pathname === '/weather') {
        const city = parsedUrl.query.city;
        const country = parsedUrl.query.country;

        if (!city) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'City is required' }));
            return;
        }

        try {
            const data = await fetchWeather(city, country);
            const result = {
                city: data.name,
                country: data.sys.country,
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather[0].icon
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        } catch (error) {
            console.error('API Error:', error.message);
            res.writeHead(error.message === 'city not found' ? 404 : 500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }

    // Handle 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

// Export for Vercel
module.exports = server;

// Only start server if run directly (local)
if (require.main === module) {
    server.on('error', (e) => {
        if (e.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use.`);
            console.log('Please stop any other running instances of the app or wait a few seconds and try again.');
            process.exit(1);
        }
    });

    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        console.log('Press Ctrl+C to stop the server.');
    });
}

// CLI Version (Bonus)
if (process.argv.includes('--cli')) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\n--- Weather CLI Mode ---');
    rl.question('Enter city name: ', async (city) => {
        rl.question('Enter country code (optional): ', async (country) => {
            try {
                console.log(`Fetching weather for ${city}...`);
                const data = await fetchWeather(city, country);
                console.log(`\nWeather in ${data.name}, ${data.sys.country}:`);
                console.log(`- Temp: ${data.main.temp}°C`);
                console.log(`- Desc: ${data.weather[0].description}`);
                console.log(`- Humidity: ${data.main.humidity}%`);
                console.log(`- Wind: ${data.wind.speed} m/s`);
            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                rl.close();
            }
        });
    });
}
