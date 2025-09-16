const mongoose = require('mongoose');

const CourseEnrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100 // Porcentaje de 0 a 100
  },
  completed: {
    type: Boolean,
    default: false
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  certifiedAt: {
    type: Date
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  }
});

// Índice compuesto para evitar inscripciones duplicadas
CourseEnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Middleware para actualizar lastAccessedAt cuando se actualiza el progreso
CourseEnrollmentSchema.pre('findOneAndUpdate', function(next) {
  if (this.getUpdate().progress !== undefined) {
    this.set({ lastAccessedAt: new Date() });
  }
  next();
});

module.exports = mongoose.model('CourseEnrollment', CourseEnrollmentSchema);

