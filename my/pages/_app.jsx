import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import '../styles/globals.css';

// 创建 Apollo Client 实例
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5002/graphql',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;