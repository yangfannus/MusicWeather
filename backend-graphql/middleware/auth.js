const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');

// 验证上下文中的令牌
const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new AuthenticationError('未授权，无访问令牌');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AuthenticationError('找不到用户');
    }

    return user;
  } catch (error) {
    throw new AuthenticationError('令牌无效或已过期');
  }
};

// 用于 GraphQL 上下文的认证中间件
const authMiddleware = async ({ req }) => {
  // 从请求头中获取令牌
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 如果没有令牌，返回默认上下文
  if (!token) {
    return { user: null };
  }

  try {
    // 验证令牌并获取用户
    const user = await verifyToken(token);
    return { user };
  } catch (error) {
    console.error('认证错误:', error.message);
    return { user: null };
  }
};

module.exports = { authMiddleware, verifyToken }; 