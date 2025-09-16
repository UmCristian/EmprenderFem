const { getUserFromToken } = require('./utils/auth');

const createContext = async ({ req }) => {
  try {
    // Obtener usuario del token si existe
    const user = await getUserFromToken(req);
    
    return {
      user,
      req
    };
  } catch (error) {
    console.error('Error creating context:', error);
    return {
      user: null,
      req
    };
  }
};

module.exports = createContext;

