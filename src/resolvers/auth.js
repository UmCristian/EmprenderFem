const User = require('../models/User');
const { generateToken } = require('../utils/auth');

const authResolvers = {
  Mutation: {
    registerUser: async (_, args, context) => {
      try {
        const { name, email, password, phone, address, identification, role } = args;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('El usuario con este email ya existe');
        }

        // Crear nuevo usuario
        const user = new User({
          name,
          email,
          password,
          phone,
          address,
          identification,
          role
        });

        await user.save();

        // Generar token
        const token = generateToken(user._id);

        return {
          token,
          user: user.toJSON()
        };
      } catch (error) {
        throw new Error(`Error al registrar usuario: ${error.message}`);
      }
    },

    loginUser: async (_, args) => {
      try {
        const { email, password } = args;

        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Credenciales inválidas');
        }

        // Verificar si el usuario está activo
        if (!user.isActive) {
          throw new Error('Usuario desactivado');
        }

        // Verificar contraseña
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
          throw new Error('Credenciales inválidas');
        }

        // Generar token
        const token = generateToken(user._id);

        return {
          token,
          user: user.toJSON()
        };
      } catch (error) {
        throw new Error(`Error al iniciar sesión: ${error.message}`);
      }
    }
  }
};

module.exports = authResolvers;

