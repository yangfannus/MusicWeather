const weatherResolvers = require('./weatherResolvers');

// Combine all resolvers
const resolvers = {
  Query: {
    ...weatherResolvers.Query
  }
};

module.exports = resolvers; 