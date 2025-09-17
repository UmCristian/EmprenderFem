const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

// Generar token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN
  });
};

// Verificar token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

// Middleware para extraer usuario del token
const getUserFromToken = async (req) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7); // Remover "Bearer "
    const decoded = verifyToken(token);
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return null;
    }

    return user;
  } catch (error) {
    // Registrar el error en consola para facilitar la depuración. Devolver
    // null permitirá a las funciones que llaman este método manejar el
    // escenario de no autenticación de manera coherente.
    console.error('Error al obtener usuario desde token:', error);
    return null;
  }
};

// Middleware para requerir autenticación
const requireAuth = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Acceso denegado. Token requerido.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error en requireAuth:', error);
    return res.status(401).json({ 
      error: 'Token inválido' 
    });
  }
};

// Middleware para requerir roles específicos
const requireRole = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await getUserFromToken(req);
      
      if (!user) {
        return res.status(401).json({ 
          error: 'Acceso denegado. Token requerido.' 
        });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ 
          error: 'Acceso denegado. Permisos insuficientes.' 
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error en requireRole:', error);
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }
  };
};

module.exports = {
  generateToken,
  verifyToken,
  getUserFromToken,
  requireAuth,
  requireRole
};

