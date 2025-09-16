const mongoose = require('mongoose');

const RepaymentSchema = new mongoose.Schema({
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['efectivo', 'transferencia', 'tarjeta', 'otro'],
    default: 'efectivo'
  },
  reference: {
    type: String,
    trim: true
  },
  paidAt: {
    type: Date,
    default: Date.now
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String,
    trim: true
  },
  isLate: {
    type: Boolean,
    default: false
  },
  lateFee: {
    type: Number,
    default: 0,
    min: 0
  }
});

// Índice para consultas eficientes por préstamo
RepaymentSchema.index({ loan: 1, paidAt: -1 });

module.exports = mongoose.model('Repayment', RepaymentSchema);

