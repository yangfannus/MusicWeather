import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

// GraphQL API地址
const GRAPHQL_API_URL = 'http://localhost:5002/graphql';

// 创建Apollo Client实例
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_API_URL,
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache()
});

// GraphQL变更 - 用户登录
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      username
      email
      token
    }
  }
`;

// GraphQL变更 - 用户注册
const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      _id
      username
      email
      token
    }
  }
`;

// GraphQL查询 - 获取当前用户
const GET_ME_QUERY = gql`
  query GetMe {
    me {
      _id
      username
      email
    }
  }
`;

// 注册函数
export const registerUser = async (userData) => {
  try {
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: userData
    });
    
    if (data && data.register) {
      // 保存令牌到本地存储
      localStorage.setItem('token', data.register.token);
      return data.register;
    }
    
    throw new Error('注册失败');
  } catch (error) {
    console.error('注册错误:', error);
    throw error;
  }
};

// 登录函数
export const loginUser = async (credentials) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: credentials
    });
    
    if (data && data.login) {
      // 保存令牌到本地存储
      localStorage.setItem('token', data.login.token);
      return data.login;
    }
    
    throw new Error('登录失败');
  } catch (error) {
    console.error('登录错误:', error);
    throw error;
  }
};

// 获取当前用户信息
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    
    // 使用令牌设置请求头
    const clientWithAuth = new ApolloClient({
      link: new HttpLink({
        uri: GRAPHQL_API_URL,
        headers: {
          authorization: `Bearer ${token}`
        }
      }),
      cache: new InMemoryCache()
    });
    
    const { data } = await clientWithAuth.query({
      query: GET_ME_QUERY,
      fetchPolicy: 'network-only' // 不使用缓存
    });
    
    return data.me;
  } catch (error) {
    console.error('获取用户信息错误:', error);
    localStorage.removeItem('token'); // 移除无效令牌
    return null;
  }
};

// 注销函数
export const logoutUser = () => {
  localStorage.removeItem('token');
};