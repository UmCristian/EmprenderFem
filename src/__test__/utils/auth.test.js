const { generateToken, verifyToken } = require('../../utils/auth');
const jwt = require('jsonwebtoken');

describe('Auth Utils', () => {
  describe('generateToken', () => {
    it('genera un token JWT válido', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = generateToken(userId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT tiene 3 partes
    });

    it('el token contiene el userId en el payload', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = generateToken(userId);
      
      const decoded = jwt.decode(token);
      expect(decoded.userId).toBe(userId);
    });
  });

  describe('verifyToken', () => {
    it('verifica un token válido', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = generateToken(userId);
      
      const decoded = verifyToken(token);
      expect(decoded.userId).toBe(userId);
    });

    it('lanza error con token inválido', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => {
        verifyToken(invalidToken);
      }).toThrow();
    });

    it('lanza error con token expirado', () => {
      // Crear un token que expire inmediatamente
      const userId = '507f1f77bcf86cd799439011';
      const expiredToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '0s' }
      );

      // Esperar un momento para que expire
      setTimeout(() => {
        expect(() => {
          verifyToken(expiredToken);
        }).toThrow();
      }, 100);
    });
  });
});
