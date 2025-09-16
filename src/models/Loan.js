const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 100000, // Mínimo $100,000 COP
    max: 5000000 // Máximo $5,000,000 COP
  },
  purpose: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid', 'overdue'],
    default: 'pending'
  },
  interestRate: {
    type: Number,
    default: 2.5, // 2.5% mensual
    min: 0,
    max: 10
  },
  termMonths: {
    type: Number,
    default: 12,
    min: 1,
    max: 36
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  approvedAt: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectionReason: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  // Información adicional para el préstamo
  monthlyPayment: {
    type: Number
  },
  totalAmount: {
    type: Number
  },
  remainingAmount: {
    type: Number
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

// Middleware para calcular pagos mensuales y fecha de vencimiento
LoanSchema.pre('save', function(next) {
  if (this.isModified('amount') || this.isModified('interestRate') || this.isModified('termMonths')) {
    // Calcular pago mensual usando fórmula de anualidad
    const monthlyRate = this.interestRate / 100;
    const totalAmount = this.amount * Math.pow(1 + monthlyRate, this.termMonths);
    this.totalAmount = totalAmount;
    this.monthlyPayment = totalAmount / this.termMonths;
    this.remainingAmount = totalAmount;
    
    // Calcular fecha de vencimiento
    if (this.approvedAt) {
      const dueDate = new Date(this.approvedAt);
      dueDate.setMonth(dueDate.getMonth() + this.termMonths);
      this.dueDate = dueDate;
    }
  }
  next();
});

// Middleware para actualizar updatedAt
LoanSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Loan', LoanSchema);

