// Configuración de la aplicación
module.exports = {
  // Base de datos
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/empoderar-mujeres',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro_aqui_cambiar_en_produccion',
  JWT_EXPIRES_IN: '7d',
  
  // Servidor
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};

