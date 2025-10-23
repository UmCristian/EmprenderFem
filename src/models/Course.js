const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
    required: false,
    trim: true,
    default: ''
  },
  category: { 
    type: String, 
    required: true,
    enum: ['emprendimiento', 'finanzas', 'costura', 'cocina', 'tecnologia', 'liderazgo', 'otros'],
    default: 'otros'
  },
  duration: { 
    type: Number, 
    required: true,
    min: 1 // Duración mínima de 1 hora
  },
  contentUrl: { 
    type: String,
    trim: true 
  },
  videoUrl: {
    type: String,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  isFree: { 
    type: Boolean, 
    default: true 
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  certification: { 
    type: Boolean, 
    default: false 
  },
  level: {
    type: String,
    enum: ['basico', 'intermedio', 'avanzado'],
    default: 'basico'
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware para actualizar updatedAt
CourseSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Course', CourseSchema);

