const Course = require('../models/Course');
  const CourseEnrollment = require('../models/CourseEnrollment');
  

const courseResolvers = {
  Query: {
    allCourses: async () => {
      try {
        return await Course.find({ isActive: true }).populate('instructor');
      } catch (error) {
        throw new Error(`Error al obtener cursos: ${error.message}`);
      }
    },

    getCourse: async (_, { id }) => {
      try {
        const course = await Course.findById(id).populate('instructor');
        if (!course) {
          throw new Error('Curso no encontrado');
        }
        return course;
      } catch (error) {
        throw new Error(`Error al obtener curso: ${error.message}`);
      }
    },

    coursesByCategory: async (_, { category }) => {
      try {
        return await Course.find({ category, isActive: true }).populate('instructor');
      } catch (error) {
        throw new Error(`Error al obtener cursos por categoría: ${error.message}`);
      }
    },

    coursesByLevel: async (_, { level }) => {
      try {
        return await Course.find({ level, isActive: true }).populate('instructor');
      } catch (error) {
        throw new Error(`Error al obtener cursos por nivel: ${error.message}`);
      }
    },

    myEnrollments: async (_, args, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        return await CourseEnrollment.find({ user: context.user._id })
          .populate('course')
          .sort({ enrolledAt: -1 });
      } catch (error) {
        throw new Error(`Error al obtener inscripciones: ${error.message}`);
      }
    },

    courseEnrollments: async (_, { courseId }, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden ver inscripciones de cursos');
      }

      try {
        return await CourseEnrollment.find({ course: courseId })
          .populate('user')
          .sort({ enrolledAt: -1 });
      } catch (error) {
        throw new Error(`Error al obtener inscripciones del curso: ${error.message}`);
      }
    }
  },

  Mutation: {
    createCourse: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden crear cursos');
      }

      try {
        const course = new Course({
          ...args,
          instructor: context.user._id
        });

        await course.save();
        return await Course.findById(course._id).populate('instructor');
      } catch (error) {
        throw new Error(`Error al crear curso: ${error.message}`);
      }
    },

    updateCourse: async (_, args, context) => {
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden actualizar cursos');
      }

      try {
        const { id, ...updateData } = args;
        const course = await Course.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        ).populate('instructor');

        if (!course) {
          throw new Error('Curso no encontrado');
        }

        return course;
      } catch (error) {
        throw new Error(`Error al actualizar curso: ${error.message}`);
      }
    },

    enrollInCourse: async (_, { courseId }, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        // Verificar que el curso existe y está activo
        const course = await Course.findById(courseId);
        if (!course || !course.isActive) {
          throw new Error('Curso no encontrado o inactivo');
        }

        // Verificar que no esté ya inscrito
        const existingEnrollment = await CourseEnrollment.findOne({
          user: context.user._id,
          course: courseId
        });

        if (existingEnrollment) {
          throw new Error('Ya estás inscrito en este curso');
        }

        // Crear nueva inscripción
        const enrollment = new CourseEnrollment({
          user: context.user._id,
          course: courseId
        });

        await enrollment.save();
        return await CourseEnrollment.findById(enrollment._id)
          .populate('user')
          .populate('course');
      } catch (error) {
        throw new Error(`Error al inscribirse en el curso: ${error.message}`);
      }
    },

    updateCourseProgress: async (_, { enrollmentId, progress }, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const enrollment = await CourseEnrollment.findById(enrollmentId);
        if (!enrollment) {
          throw new Error('Inscripción no encontrada');
        }

        // Verificar que el usuario es el propietario de la inscripción o es admin
        if (enrollment.user.toString() !== context.user._id.toString() && context.user.role !== 'admin') {
          throw new Error('No tienes permisos para actualizar este progreso');
        }

        // Validar progreso
        if (progress < 0 || progress > 100) {
          throw new Error('El progreso debe estar entre 0 y 100');
        }

        enrollment.progress = progress;
        
        // Si el progreso es 100%, marcar como completado
        if (progress === 100 && !enrollment.completed) {
          enrollment.completed = true;
          enrollment.completedAt = new Date();
        }

        await enrollment.save();
        return await CourseEnrollment.findById(enrollment._id)
          .populate('user')
          .populate('course');
      } catch (error) {
        throw new Error(`Error al actualizar progreso: ${error.message}`);
      }
    },

    completeCourseEnrollment: async (_, { enrollmentId }, context) => {
      if (!context.user) {
        throw new Error('No autenticado');
      }

      try {
        const enrollment = await CourseEnrollment.findById(enrollmentId);
        if (!enrollment) {
          throw new Error('Inscripción no encontrada');
        }

        // Verificar que el usuario es el propietario de la inscripción o es admin
        if (enrollment.user.toString() !== context.user._id.toString() && context.user.role !== 'admin') {
          throw new Error('No tienes permisos para completar esta inscripción');
        }

        enrollment.completed = true;
        enrollment.progress = 100;
        enrollment.completedAt = new Date();

        // Si el curso tiene certificación, marcar como certificado
        const course = await Course.findById(enrollment.course);
        if (course && course.certification) {
          enrollment.certifiedAt = new Date();
        }

        await enrollment.save();
        return await CourseEnrollment.findById(enrollment._id)
          .populate('user')
          .populate('course');
      } catch (error) {
        throw new Error(`Error al completar curso: ${error.message}`);
      }
    }
  },

  Course: {
    enrollments: async (parent) => {
      try {
        return await CourseEnrollment.find({ course: parent._id })
          .populate('user')
          .sort({ enrolledAt: -1 });
      } catch (error) {
        console.error('Error al obtener inscripciones del curso:', error);
        return [];
      }
    }
  }
};

module.exports = courseResolvers;

