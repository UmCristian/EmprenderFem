const Course = require('../../models/Course');

describe('Course Model', () => {
  it('crea un curso con todos los campos', () => {
    const courseData = {
      title: 'Curso de Emprendimiento',
      description: 'Aprende a emprender',
      category: 'emprendimiento',
      level: 'basico',
      duration: 40,
      instructor: '507f1f77bcf86cd799439011',
      isFree: true,
      price: 0,
      thumbnailUrl: 'https://example.com/image.jpg',
      certification: true,
      enrolledCount: 0,
      createdAt: new Date(),
    };

    const course = new Course(courseData);
    
    expect(course.title).toBe('Curso de Emprendimiento');
    expect(course.category).toBe('emprendimiento');
    expect(course.level).toBe('basico');
    expect(course.isFree).toBe(true);
  });

  it('tiene un campo id que mapea _id', () => {
    const course = new Course({
      title: 'Test Course',
      description: 'Test',
      category: 'test',
      level: 'basico',
      duration: 10,
      instructor: '507f1f77bcf86cd799439011',
    });

    course._id = '507f1f77bcf86cd799439012';
    expect(course.id).toBe('507f1f77bcf86cd799439012');
  });
});
