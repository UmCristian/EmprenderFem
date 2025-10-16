const Notification = require('../models/Notification');
const User = require('../models/User');

const notificationResolvers = {
  Query: {
    // Obtener notificaciones del usuario actual
    myNotifications: async (_, __, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const notifications = await Notification.find({ user: context.user._id })
          .sort({ createdAt: -1 })
          .limit(50)
          .populate('user');
        
        return notifications;
      } catch (error) {
        throw new Error(`Error al obtener notificaciones: ${error.message}`);
      }
    },

    // Contar notificaciones no leídas
    unreadNotificationsCount: async (_, __, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const count = await Notification.countDocuments({
          user: context.user._id,
          read: false
        });
        
        return count;
      } catch (error) {
        throw new Error(`Error al contar notificaciones: ${error.message}`);
      }
    },
  },

  Mutation: {
    // Marcar notificación como leída
    markNotificationAsRead: async (_, { notificationId }, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const notification = await Notification.findOneAndUpdate(
          { _id: notificationId, user: context.user._id },
          { read: true },
          { new: true }
        ).populate('user');

        if (!notification) {
          throw new Error('Notificación no encontrada');
        }

        return notification;
      } catch (error) {
        throw new Error(`Error al marcar notificación: ${error.message}`);
      }
    },

    // Marcar todas las notificaciones como leídas
    markAllNotificationsAsRead: async (_, __, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        await Notification.updateMany(
          { user: context.user._id, read: false },
          { read: true }
        );

        return true;
      } catch (error) {
        throw new Error(`Error al marcar notificaciones: ${error.message}`);
      }
    },
  },

  Notification: {
    user: async (notification) => {
      return await User.findById(notification.user);
    },
  },
};

// Función helper para crear notificaciones
const createNotification = async (userId, type, title, message, relatedId = null, relatedModel = null) => {
  try {
    const notification = new Notification({
      user: userId,
      type,
      title,
      message,
      relatedId,
      relatedModel
    });

    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error al crear notificación:', error);
  }
};

// Función para notificar a todos los admins
const notifyAdmins = async (type, title, message, relatedId = null, relatedModel = null) => {
  try {
    const admins = await User.find({ role: 'admin', isActive: true });
    
    const notifications = admins.map(admin => ({
      user: admin._id,
      type,
      title,
      message,
      relatedId,
      relatedModel
    }));

    await Notification.insertMany(notifications);
  } catch (error) {
    console.error('Error al notificar admins:', error);
  }
};

module.exports = {
  ...notificationResolvers,
  createNotification,
  notifyAdmins
};
