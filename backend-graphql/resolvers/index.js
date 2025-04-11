const weatherResolvers = require('./weatherResolvers');

module.exports = {
  Query: {
    ...weatherResolvers.Query
  }
};