const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { authMiddleware } = require('./middleware/auth');

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 添加环境变量检查
console.log('环境变量加载状态:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('OPENWEATHER_API_KEY:', process.env.OPENWEATHER_API_KEY ? '已设置' : '未设置');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '已设置' : '未设置');

// 连接数据库
connectDB();

// 初始化 Express 应用
const app = express();

// 中间件
app.use(cors({
  origin: '*', // 允许所有域名访问
  credentials: true
}));
app.use(express.json());

// 基础路由 - 提供当前 API 信息
app.get('/', (req, res) => {
  res.send('GraphQL API 运行中，请访问 /graphql 端点');
});

// 异步启动函数
async function startApolloServer() {
  // 创建 Apollo Server 实例
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    formatError: (err) => {
      // 在开发环境中提供更详细的错误信息
      if (process.env.NODE_ENV !== 'production') {
        console.error('GraphQL 错误:', err);
      }
      return {
        message: err.message,
        locations: err.locations,
        path: err.path,
        stack: process.env.NODE_ENV === 'production' ? null : err.extensions?.exception?.stacktrace
      };
    },
    // 启用 GraphQL Playground（Apollo Server 3 默认使用 Apollo Studio）
    playground: process.env.NODE_ENV !== 'production',
    introspection: true,
  });

  // 启动 Apollo Server
  await server.start();

  // 将 Apollo Server 应用到 Express
  server.applyMiddleware({ app, path: '/graphql' });

  // 定义端口并启动服务器
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`服务器在 ${process.env.NODE_ENV} 模式下的端口 ${PORT} 上运行`);
    console.log(`GraphQL 端点：http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// 启动服务器
startApolloServer().catch(err => {
  console.error('启动服务器时出错:', err);
  process.exit(1);
}); 