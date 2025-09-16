const User = require('./src/models/User');
const Course = require('./src/models/Course');
const connectDB = require('./src/utils/connectDB');

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');
    
    // Conectar a la base de datos
    await connectDB();

    // Limpiar datos existentes
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('🧹 Datos existentes eliminados');

    // Crear usuarios de ejemplo
    const users = await User.create([
      {
        name: 'María González',
        email: 'maria@ejemplo.com',
        password: 'password123',
        phone: '3001234567',
        address: 'Calle 123 #45-67, Bogotá',
        identification: '12345678',
        role: 'beneficiary'
      },
      {
        name: 'Ana Rodríguez',
        email: 'ana@ejemplo.com',
        password: 'password123',
        phone: '3009876543',
        address: 'Carrera 45 #78-90, Medellín',
        identification: '87654321',
        role: 'beneficiary'
      },
      {
        name: 'Carlos Mendoza',
        email: 'carlos@ejemplo.com',
        password: 'password123',
        phone: '3005555555',
        address: 'Calle 80 #12-34, Cali',
        identification: '11223344',
        role: 'mentor'
      },
      {
        name: 'Admin Sistema',
        email: 'admin@empoderar.com',
        password: 'admin123',
        phone: '3000000000',
        address: 'Oficina Principal',
        identification: '00000000',
        role: 'admin'
      }
    ]);
    console.log('👥 Usuarios creados:', users.length);

    // Crear cursos de ejemplo
    const courses = await Course.create([
      {
        title: 'Emprendimiento Básico',
        description: 'Aprende los conceptos fundamentales para iniciar tu propio negocio',
        category: 'emprendimiento',
        duration: 20,
        contentUrl: 'https://ejemplo.com/materiales/emprendimiento-basico.pdf',
        videoUrl: 'https://ejemplo.com/videos/emprendimiento-basico.mp4',
        thumbnailUrl: 'https://ejemplo.com/images/emprendimiento-thumb.jpg',
        isFree: true,
        price: 0,
        certification: true,
        level: 'basico',
        instructor: users[2]._id // Carlos Mendoza como mentor
      },
      {
        title: 'Finanzas Personales',
        description: 'Gestiona tus finanzas personales y familiares de manera efectiva',
        category: 'finanzas',
        duration: 15,
        contentUrl: 'https://ejemplo.com/materiales/finanzas-personales.pdf',
        videoUrl: 'https://ejemplo.com/videos/finanzas-personales.mp4',
        thumbnailUrl: 'https://ejemplo.com/images/finanzas-thumb.jpg',
        isFree: true,
        price: 0,
        certification: true,
        level: 'basico',
        instructor: users[2]._id
      },
      {
        title: 'Taller de Costura',
        description: 'Aprende técnicas básicas de costura para crear productos textiles',
        category: 'costura',
        duration: 30,
        contentUrl: 'https://ejemplo.com/materiales/costura-basica.pdf',
        videoUrl: 'https://ejemplo.com/videos/costura-basica.mp4',
        thumbnailUrl: 'https://ejemplo.com/images/costura-thumb.jpg',
        isFree: true,
        price: 0,
        certification: true,
        level: 'basico',
        instructor: users[2]._id
      },
      {
        title: 'Marketing Digital',
        description: 'Aprende a promocionar tu negocio en redes sociales',
        category: 'tecnologia',
        duration: 25,
        contentUrl: 'https://ejemplo.com/materiales/marketing-digital.pdf',
        videoUrl: 'https://ejemplo.com/videos/marketing-digital.mp4',
        thumbnailUrl: 'https://ejemplo.com/images/marketing-thumb.jpg',
        isFree: false,
        price: 50000,
        certification: true,
        level: 'intermedio',
        instructor: users[2]._id
      },
      {
        title: 'Liderazgo Femenino',
        description: 'Desarrolla habilidades de liderazgo y empoderamiento',
        category: 'liderazgo',
        duration: 18,
        contentUrl: 'https://ejemplo.com/materiales/liderazgo-femenino.pdf',
        videoUrl: 'https://ejemplo.com/videos/liderazgo-femenino.mp4',
        thumbnailUrl: 'https://ejemplo.com/images/liderazgo-thumb.jpg',
        isFree: true,
        price: 0,
        certification: true,
        level: 'intermedio',
        instructor: users[2]._id
      }
    ]);
    console.log('📚 Cursos creados:', courses.length);

    console.log('✅ Seed completado exitosamente!');
    console.log('\n📋 Datos creados:');
    console.log('- Usuarios:', users.length);
    console.log('  - Beneficiarias: 2');
    console.log('  - Mentor: 1');
    console.log('  - Admin: 1');
    console.log('- Cursos:', courses.length);
    console.log('\n🔑 Credenciales de prueba:');
    console.log('Beneficiaria: maria@ejemplo.com / password123');
    console.log('Mentor: carlos@ejemplo.com / password123');
    console.log('Admin: admin@empoderar.com / admin123');

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
  } finally {
    process.exit(0);
  }
}

// Ejecutar seed
seedDatabase();

