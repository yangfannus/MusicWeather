# Simple Weather App

A clean, minimalist weather application built with Next.js that shows the current weather for your location.

## Features

- Current weather display with temperature, condition, and icon
- Weather details including humidity, wind speed, and pressure
- Automatic location detection
- Responsive design that works on all devices

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend API

This application uses a GraphQL backend for weather data. Make sure to start the backend server as well:

```bash
cd ../backend-graphql
npm install
npm start
```

The GraphQL API will be running at [http://localhost:5002/graphql](http://localhost:5002/graphql).

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **API**: Apollo Client, GraphQL
- **Backend**: Express, Apollo Server
- **Weather Data**: OpenWeatherMap API

## Environment Variables

Create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:5002/graphql
```

## License

MIT

test
