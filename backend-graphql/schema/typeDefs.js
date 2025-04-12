const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Location Type
  type Location {
    city: String!
    country: String!
    lat: Float!
    lon: Float!
  }
  
  # Current Weather Type
  type CurrentWeather {
    temperature: Int!
    condition: String!
    icon: String!
    city: String!
    country: String!
    weatherId: Int!
    description: String!
    windSpeed: Float!
    humidity: Int!
    pressure: Int!
  }
  
  # Forecast Item Type
  type ForecastItem {
    datetime: Float!
    hour: Int!
    temperature: Int!
    condition: String!
    icon: String!
    description: String!
    windSpeed: Float!
    humidity: Int!
  }
  
  # Weather Forecast Type
  type WeatherForecast {
    city: String!
    country: String!
    forecast: [ForecastItem!]!
  }
  
  # Query
  type Query {
    # Weather Queries
    getLocationByIp: Location          # Get location by IP
    getCurrentWeather(lat: Float!, lon: Float!): CurrentWeather  # Get current weather
    getWeatherForecast(lat: Float!, lon: Float!): WeatherForecast  # Get weather forecast
  }
`;

module.exports = typeDefs;