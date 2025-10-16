// src/resolvers/index.js
const authResolvers = require('./auth');
const userResolvers = require('./user');
const courseResolvers = require('./course');
const loanResolvers = require('./loan');
const statsResolvers = require('./stats');
const notificationResolvers = require('./notification');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...courseResolvers.Query,
    ...loanResolvers.Query,
    ...statsResolvers.Query,
    ...notificationResolvers.Query
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...courseResolvers.Mutation,
    ...loanResolvers.Mutation,
    ...notificationResolvers.Mutation
  },
  User: {
    id: (u) => String(u.id ?? u._id),
    ...userResolvers.User
  },
  Course: {
    ...courseResolvers.Course
  },
  Loan: {
    ...loanResolvers.Loan
  },
  Notification: {
    ...notificationResolvers.Notification
  }
};

module.exports = resolvers;
