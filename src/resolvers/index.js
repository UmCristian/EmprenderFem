const authResolvers = require('./auth');
const userResolvers = require('./user');
const courseResolvers = require('./course');
const loanResolvers = require('./loan');
const statsResolvers = require('./stats');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...courseResolvers.Query,
    ...loanResolvers.Query,
    ...statsResolvers.Query
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...courseResolvers.Mutation,
    ...loanResolvers.Mutation
  },
  User: {
    ...userResolvers.User
  },
  Course: {
    ...courseResolvers.Course
  },
  Loan: {
    ...loanResolvers.Loan
  }
};

module.exports = resolvers;
