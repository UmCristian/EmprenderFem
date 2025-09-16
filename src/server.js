const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const express = require('express');
const cors = require('cors');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const createContext = require('./context');
const connectDB = require('./utils/connectDB');
const config = require('./config');

async function startServer() {
  // Conectar a la base de datos
  await connectDB();

  // Crear servidor Apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
    introspection: config.NODE_ENV === 'development',
  });

  // Iniciar servidor Apollo
  const { url } = await startStandaloneServer(server, {
    listen: { port: config.PORT },
    context: createContext,
  });

  console.log(`🚀 Servidor GraphQL ejecutándose en ${url}`);
  console.log(`📊 Health check disponible en http://localhost:${config.PORT}/health`);
  console.log(`🌍 Entorno: ${config.NODE_ENV}`);
}

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Iniciar servidor
startServer().catch((error) => {
  console.error('Error al iniciar servidor:', error);
  process.exit(1);
});