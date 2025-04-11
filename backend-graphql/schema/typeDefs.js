const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # 用户类型
  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: String
  }

  # 认证响应类型
  type AuthResponse {
    _id: ID!
    username: String!
    email: String!
    token: String!
  }
  
  # 位置信息类型
  type Location {
    city: String!
    country: String!
    lat: Float!
    lon: Float!
  }
  
  # 当前天气类型
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
  
  # 天气预报项类型
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
  
  # 天气预报类型
  type WeatherForecast {
    city: String!
    country: String!
    forecast: [ForecastItem!]!
  }
  
  # 查询
  type Query {
    # 用户查询
    me: User                           # 获取当前登录用户信息
    
    # 天气查询
    getLocationByIp: Location          # 通过IP获取位置信息
    getCurrentWeather(lat: Float!, lon: Float!): CurrentWeather  # 获取当前天气
    getWeatherForecast(lat: Float!, lon: Float!): WeatherForecast  # 获取天气预报
  }
  
  # 修改
  type Mutation {
    # 用户认证相关
    register(username: String!, email: String!, password: String!): AuthResponse  # 注册
    login(email: String!, password: String!): AuthResponse                       # 登录
  }
`;

module.exports = typeDefs; 