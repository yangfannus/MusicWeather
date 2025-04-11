# 音乐天气游戏 GraphQL 后端

基于 GraphQL 的音乐天气游戏后端 API。

## 功能

- 用户认证（注册、登录）
- 基于 IP 的位置检测
- 天气信息获取（当前天气和预报）

## 技术栈

- Node.js
- Express
- GraphQL (Apollo Server)
- MongoDB
- JWT 认证

## 安装

1. 克隆仓库：
```bash
git clone <repository-url>
```

2. 安装依赖：
```bash
cd backend-graphql
npm install
```

3. 创建并配置 `.env` 文件：
```
NODE_ENV=development
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
OPENWEATHER_API_KEY=<your_openweather_api_key>
```

## 运行

开发模式：
```bash
npm run dev
```

生产模式：
```bash
npm start
```

## API 端点

GraphQL 端点：`/graphql`

## GraphQL 操作示例

### 用户注册
```graphql
mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    _id
    username
    email
    token
  }
}
```

### 用户登录
```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    _id
    username
    email
    token
  }
}
```

### 获取当前用户信息
```graphql
query GetMe {
  me {
    _id
    username
    email
  }
}
```

### 通过 IP 获取位置信息
```graphql
query GetLocationByIp {
  getLocationByIp {
    city
    country
    lat
    lon
  }
}
```

### 获取当前天气
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

### 获取天气预报
```graphql
query GetWeatherForecast($lat: Float!, $lon: Float!) {
  getWeatherForecast(lat: $lat, lon: $lon) {
    city
    country
    forecast {
      datetime
      hour
      temperature
      condition
      icon
      description
      windSpeed
      humidity
    }
  }
}
```