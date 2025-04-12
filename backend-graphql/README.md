# Weather API Backend

A simple GraphQL backend for weather data.

## Features

- Current weather information retrieval based on coordinates

## Technology Stack

- Node.js
- Express
- GraphQL (Apollo Server)
- OpenWeather API

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
cd backend-graphql
npm install
```

3. Create and configure the `.env` file:
```
NODE_ENV=development
PORT=5002
OPENWEATHER_API_KEY=<your_openweather_api_key>
```

## Running

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoint

GraphQL endpoint: `/graphql`

## GraphQL Operation Example

### Get Current Weather
```graphql
query GetCurrentWeather($lat: Float!, $lon: Float!) {
  getCurrentWeather(lat: $lat, lon: $lon) {
    temperature
    condition
    icon
    city
    country
    description
    windSpeed
    humidity
    pressure
  }
}
```

Variables:
```json
{
  "lat": 31.2304,
  "lon": 121.4737
}
```