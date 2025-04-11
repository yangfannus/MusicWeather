const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
  
  # Queries
  type Query {
    # Weather Queries
    getCurrentWeather(lat: Float!, lon: Float!): CurrentWeather  # Get current weather
  }
`;

module.exports = typeDefs; 