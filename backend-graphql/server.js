const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Check environment variables
console.log('Environment Variables Status:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('OPENWEATHER_API_KEY:', process.env.OPENWEATHER_API_KEY ? 'Set' : 'Not Set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not Set');

// Initialize Express application
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow access from all domains
  credentials: true
}));
app.use(express.json());

// Base route - Provide current API information
app.get('/', (req, res) => {
  res.send('GraphQL API is running, please visit /graphql endpoint');
});

// Async startup function
async function startApolloServer() {
  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      // Provide more detailed error information in development environment
      if (process.env.NODE_ENV !== 'production') {
        console.error('GraphQL Error:', err);
      }
      return {
        message: err.message,
        locations: err.locations,
        path: err.path,
        stack: process.env.NODE_ENV === 'production' ? null : err.extensions?.exception?.stacktrace
      };
    },
    // Enable GraphQL Playground (Apollo Server 3 uses Apollo Studio by default)
    playground: process.env.NODE_ENV !== 'production',
    introspection: true,
  });

  // Start Apollo Server
  await server.start();

  // Apply Apollo Server to Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Define port and start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start server
startApolloServer().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});