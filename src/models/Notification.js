const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: [
      'course_enrollment',      // Usuario se inscribió en curso
      'course_completed',       // Usuario completó curso
      'course_created',         // Nuevo curso disponible
      'course_updated',         // Curso actualizado
      'loan_requested',         // Préstamo solicitado (para admin)
      'loan_approved',          // Préstamo aprobado
      'loan_rejected',          // Préstamo rechazado
      'payment_due',            // Pago próximo a vencer
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    // Puede ser ID de curso, préstamo, etc.
  },
  relatedModel: {
    type: String,
    enum: ['Course', 'Loan', 'CourseEnrollment'],
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Índice compuesto para consultas eficientes
notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
