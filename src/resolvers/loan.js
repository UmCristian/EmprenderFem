const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');

const { createNotification, notifyAdmins } = require('./notification');

const loanResolvers = {
  Query: {
    myLoans: async (_, args, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        return await Loan.find({ user: context.user._id })
          .populate('user')
          .populate('approvedBy')
          .sort({ requestedAt: -1 });
      } catch (error) {
        throw new Error(`Error al obtener préstamos: ${error.message}`);
      }
    },

    getLoan: async (_, { id }, context) => {
      try {
        const loan = await Loan.findById(id)
          .populate('user')
          .populate('approvedBy');

        if (!loan) {
          throw new Error('Préstamo no encontrado');
        }

        // Verificar permisos: el usuario puede ver su propio préstamo o ser admin
        if (context.user && (loan.user._id.toString() === context.user._id.toString() || context.user.role === 'admin')) {
          return loan;
        }

        throw new Error('No tienes permisos para ver este préstamo');
      } catch (error) {
        throw new Error(`Error al obtener préstamo: ${error.message}`);
      }
    },

    allLoans: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden ver todos los préstamos');
      }

      try {
        return await Loan.find()
          .populate('user')
          .populate('approvedBy')
          .sort({ requestedAt: -1 });
      } catch (error) {
        throw new Error(`Error al obtener préstamos: ${error.message}`);
      }
    },

    loansByStatus: async (_, { status }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden filtrar préstamos por estado');
      }

      try {
        return await Loan.find({ status })
          .populate('user')
          .populate('approvedBy')
          .sort({ requestedAt: -1 });
      } catch (error) {
        throw new Error(`Error al obtener préstamos por estado: ${error.message}`);
      }
    },

    loanRepayments: async (_, { loanId }, context) => {
      try {
        const loan = await Loan.findById(loanId);
        if (!loan) {
          throw new Error('Préstamo no encontrado');
        }

        // Verificar permisos
        if (context.user && (loan.user.toString() === context.user._id.toString() || context.user.role === 'admin')) {
          return await Repayment.find({ loan: loanId })
            .populate('recordedBy')
            .sort({ paidAt: -1 });
        }

        throw new Error('No tienes permisos para ver los pagos de este préstamo');
      } catch (error) {
        throw new Error(`Error al obtener pagos: ${error.message}`);
      }
    }
  },

  Mutation: {
    requestLoan: async (_, args, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const { amount, purpose, termMonths } = args;

        // Validaciones básicas
        if (amount < 100000) {
          throw new Error('El monto mínimo es $100,000 COP');
        }

        if (amount > 5000000) {
          throw new Error('El monto máximo es $5,000,000 COP');
        }

        if (termMonths < 1 || termMonths > 36) {
          throw new Error('El plazo debe estar entre 1 y 36 meses');
        }

        // Verificar si el usuario tiene préstamos pendientes
        const pendingLoan = await Loan.findOne({
          user: context.user._id,
          status: { $in: ['pending', 'approved'] }
        });

        if (pendingLoan) {
          throw new Error('Ya tienes un préstamo pendiente o aprobado');
        }

        const loan = new Loan({
          user: context.user._id,
          amount,
          purpose,
          termMonths
        });

        await loan.save();
        const populatedLoan = await Loan.findById(loan._id).populate('user');

        // Notificar a admins sobre nueva solicitud
        await notifyAdmins(
          'loan_requested',
          'Nueva solicitud de préstamo',
          `${context.user.name} ha solicitado un préstamo de $${amount.toLocaleString()}`,
          loan._id,
          'Loan'
        );

        return populatedLoan;
      } catch (error) {
        throw new Error(`Error al solicitar préstamo: ${error.message}`);
      }
    },

    updateLoanStatus: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden actualizar el estado de préstamos');
      }

      try {
        const { loanId, status, rejectionReason, notes } = args;

        const loan = await Loan.findById(loanId);
        if (!loan) {
          throw new Error('Préstamo no encontrado');
        }

        const previousStatus = loan.status;
        const updateData = { status };

        if (status === 'approved') {
          updateData.approvedAt = new Date();
          updateData.approvedBy = context.user._id;
        }

        if (status === 'rejected' && rejectionReason) {
          updateData.rejectionReason = rejectionReason;
        }

        if (notes) {
          updateData.notes = notes;
        }

        const updatedLoan = await Loan.findByIdAndUpdate(
          loanId,
          updateData,
          { new: true, runValidators: true }
        )
          .populate('user')
          .populate('approvedBy');

        // Notificar al usuario sobre el cambio de estado
        if (status === 'approved' && previousStatus !== 'approved') {
          await createNotification(
            loan.user,
            'loan_approved',
            '¡Préstamo aprobado!',
            `Tu solicitud de préstamo por $${loan.amount.toLocaleString()} ha sido aprobada`,
            loan._id,
            'Loan'
          );
        } else if (status === 'rejected' && previousStatus !== 'rejected') {
          await createNotification(
            loan.user,
            'loan_rejected',
            'Préstamo rechazado',
            `Tu solicitud de préstamo ha sido rechazada. ${rejectionReason || ''}`,
            loan._id,
            'Loan'
          );
        }

        return updatedLoan;
      } catch (error) {
        throw new Error(`Error al actualizar estado del préstamo: ${error.message}`);
      }
    },

    deleteLoan: async (_, { loanId }, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const loan = await Loan.findById(loanId).populate('user');
        if (!loan) {
          throw new Error('Préstamo no encontrado');
        }

        // Solo el usuario dueño puede eliminar su préstamo rechazado
        if (loan.user._id.toString() !== context.user._id.toString()) {
          throw new Error('No tienes permisos para eliminar este préstamo');
        }

        // Solo se pueden eliminar préstamos rechazados
        if (loan.status !== 'rejected') {
          throw new Error('Solo se pueden eliminar préstamos rechazados');
        }

        await Loan.findByIdAndDelete(loanId);
        return loan;
      } catch (error) {
        throw new Error(`Error al eliminar préstamo: ${error.message}`);
      }
    },

    registerRepayment: async (_, args, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const { loanId, amount, paymentMethod, reference, notes } = args;

        const loan = await Loan.findById(loanId);
        if (!loan) {
          throw new Error('Préstamo no encontrado');
        }

        // Verificar permisos: el usuario puede registrar pagos de su propio préstamo o ser admin
        if (loan.user.toString() !== context.user._id.toString() && context.user.role !== 'admin') {
          throw new Error('No tienes permisos para registrar pagos de este préstamo');
        }

        if (loan.status !== 'approved') {
          throw new Error('Solo se pueden registrar pagos para préstamos aprobados');
        }

        // Validar monto
        if (amount <= 0) {
          throw new Error('El monto del pago debe ser mayor a 0');
        }

        // Calcular si es un pago tardío
        const isLate = loan.dueDate && new Date() > new Date(loan.dueDate);
        const lateFee = isLate ? amount * 0.05 : 0; // 5% de recargo por mora

        const repayment = new Repayment({
          loan: loanId,
          amount,
          paymentMethod,
          reference,
          notes,
          isLate,
          lateFee,
          recordedBy: context.user._id
        });

        await repayment.save();

        // Actualizar el monto restante del préstamo
        const totalPaid = await Repayment.aggregate([
          { $match: { loan: loan._id } },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const remainingAmount = loan.totalAmount - (totalPaid[0]?.total || 0);
        
        // Si se ha pagado completamente, cambiar estado a 'paid'
        if (remainingAmount <= 0) {
          await Loan.findByIdAndUpdate(loanId, { 
            status: 'paid',
            remainingAmount: 0
          });
        } else {
          await Loan.findByIdAndUpdate(loanId, { 
            remainingAmount 
          });
        }

        return await Repayment.findById(repayment._id)
          .populate('loan')
          .populate('recordedBy');
      } catch (error) {
        throw new Error(`Error al registrar pago: ${error.message}`);
      }
    }
  },

  Loan: {
    user: async (parent) => {
      try {
        const User = require('../models/User');
        // Si no hay user, retornar null
        if (!parent.user) {
          return null;
        }
        // Si ya está poblado, retornarlo
        if (typeof parent.user === 'object' && parent.user._id) {
          return parent.user;
        }
        // Poblar el usuario
        const user = await User.findById(parent.user);
        return user || null;
      } catch (error) {
        console.error('Error al obtener usuario del préstamo:', error);
        return null;
      }
    },
    repayments: async (parent) => {
      try {
        return await Repayment.find({ loan: parent._id })
          .populate('recordedBy')
          .sort({ paidAt: -1 });
      } catch (error) {
        console.error('Error al obtener pagos del préstamo:', error);
        return [];
      }
    }
  }
};

module.exports = loanResolvers;

