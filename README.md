# SkyCast - Smart Weather Application

SkyCast is a modern, responsive weather web application built with Node.js and the OpenWeatherMap API. It provides real-time weather data with a premium glassmorphism design.

## 🚀 Features

- **Real-Time Data**: Get current temperature, humidity, wind speed, and weather descriptions.
- **Dynamic UI**: The background changes dynamically based on the weather conditions (Sun, Clouds, Rain).
- **Responsive Design**: optimized for both desktop and mobile viewing.
- **CLI Mode**: Check the weather directly from your terminal.
- **Secure Configuration**: Uses environment variables to protect your API keys.

## 🛠️ Technology Stack

- **Backend**: Node.js, HTTP Module, Axios, Dotenv
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Fetch API)
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- An OpenWeatherMap API Key

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your API key:
   ```env
   API_KEY=your_openweathermap_api_key_here
   ```

## 🚀 Running the App

### Start the Web Server
```bash
npm start
```
By default, the app runs at `http://localhost:8080`.

### Run CLI Mode
```bash
node weather.js --cli
```

## 🌐 Hosting for Free

You can host this project for free on platforms like **Render** or **Railway**:

1. Create a New Web Service on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Set the **Build Command** to `npm install`.
4. Set the **Start Command** to `npm start`.
5. Add your `API_KEY` to the **Environment Variables** section in the Render dashboard.

## 📄 License

This project is licensed under the MIT License.
