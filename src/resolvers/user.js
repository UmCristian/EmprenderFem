const User = require('../models/User');
const CourseEnrollment = require('../models/CourseEnrollment');
const Loan = require('../models/Loan');

const userResolvers = {
  Query: {
    me: async (_, args, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }
      return context.user;
    },

    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id).select('-password');
        if (!user) {
          throw new Error('Usuario no encontrado');
        }
        return user;
      } catch (error) {
        throw new Error(`Error al obtener usuario: ${error.message}`);
      }
    },

    allUsers: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden ver todos los usuarios');
      }
      
      try {
        return await User.find({ isActive: true }).select('-password');
      } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
      }
    },

    usersByRole: async (_, { role }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden filtrar usuarios por rol');
      }
      
      try {
        return await User.find({ role, isActive: true }).select('-password');
      } catch (error) {
        throw new Error(`Error al obtener usuarios por rol: ${error.message}`);
      }
    }
  },

  Mutation: {
    updateProfile: async (_, args, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const { name, phone, address, identification } = args;
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;
        if (identification !== undefined) updateData.identification = identification;

        const user = await User.findByIdAndUpdate(
          context.user._id,
          updateData,
          { new: true, runValidators: true }
        ).select('-password');

        return user;
      } catch (error) {
        throw new Error(`Error al actualizar perfil: ${error.message}`);
      }
    }
  },

  User: {
    courses: async (parent) => {
      try {
        return await CourseEnrollment.find({ user: parent._id })
          .populate('course')
          .sort({ enrolledAt: -1 });
      } catch (error) {
        console.error('Error al obtener cursos del usuario:', error);
        return [];
      }
    },

    loans: async (parent) => {
      try {
        return await Loan.find({ user: parent._id })
          .populate('approvedBy')
          .sort({ requestedAt: -1 });
      } catch (error) {
        console.error('Error al obtener préstamos del usuario:', error);
        return [];
      }
    }
  }
};

module.exports = userResolvers;

