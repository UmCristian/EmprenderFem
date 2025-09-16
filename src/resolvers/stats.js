const User = require('../models/User');
const Course = require('../models/Course');
const CourseEnrollment = require('../models/CourseEnrollment');
const Loan = require('../models/Loan');

const statsResolvers = {
  Query: {
    stats: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden ver estadísticas');
      }

      try {
        const [
          totalUsers,
          totalCourses,
          totalLoans,
          activeEnrollments,
          completedCourses,
          approvedLoans,
          loanAmounts
        ] = await Promise.all([
          User.countDocuments({ isActive: true }),
          Course.countDocuments({ isActive: true }),
          Loan.countDocuments(),
          CourseEnrollment.countDocuments({ completed: false }),
          CourseEnrollment.countDocuments({ completed: true }),
          Loan.countDocuments({ status: 'approved' }),
          Loan.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
          ])
        ]);

        return {
          totalUsers,
          totalCourses,
          totalLoans,
          activeEnrollments,
          completedCourses,
          approvedLoans,
          totalLoanAmount: loanAmounts[0]?.total || 0
        };
      } catch (error) {
        throw new Error(`Error al obtener estadísticas: ${error.message}`);
      }
    }
  }
};

module.exports = statsResolvers;

