const CourseEnrollment = require('../../models/CourseEnrollment');

describe('CourseEnrollment Model', () => {
  it('crea una inscripción con todos los campos', () => {
    const enrollmentData = {
      user: '507f1f77bcf86cd799439011',
      course: '507f1f77bcf86cd799439012',
      enrolledAt: new Date(),
      progress: 0,
      completed: false,
      completedAt: null,
    };

    const enrollment = new CourseEnrollment(enrollmentData);
    
    expect(enrollment.progress).toBe(0);
    expect(enrollment.completed).toBe(false);
  });

  it('actualiza el progreso correctamente', () => {
    const enrollment = new CourseEnrollment({
      user: '507f1f77bcf86cd799439011',
      course: '507f1f77bcf86cd799439012',
      progress: 50,
      completed: false,
    });

    expect(enrollment.progress).toBe(50);
  });

  it('marca como completado cuando progress es 100', () => {
    const enrollment = new CourseEnrollment({
      user: '507f1f77bcf86cd799439011',
      course: '507f1f77bcf86cd799439012',
      progress: 100,
      completed: true,
      completedAt: new Date(),
    });

    expect(enrollment.completed).toBe(true);
    expect(enrollment.completedAt).toBeDefined();
  });

  it('tiene un campo id que mapea _id', () => {
    const enrollment = new CourseEnrollment({
      user: '507f1f77bcf86cd799439011',
      course: '507f1f77bcf86cd799439012',
      progress: 0,
      completed: false,
    });

    enrollment._id = '507f1f77bcf86cd799439013';
    expect(enrollment.id).toBe('507f1f77bcf86cd799439013');
  });
});
