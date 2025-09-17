// sonar-runner.js
require('dotenv').config();                // lee SONAR_TOKEN / SONAR_HOST_URL / SONAR_PROJECT_VERSION (opcional)
const scanner = require('sonarqube-scanner');

const coverageReports = [
  'coverage/lcov.info',                    // backend
  'frontend/coverage/lcov.info'            // frontend
].join(',');

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL || 'http://localhost:9000',
    token: process.env.SONAR_TOKEN,        // NUNCA guardes el token en el repo

    options: {
      // Identidad del proyecto
      'sonar.projectKey': 'emprenderfem',
      'sonar.projectName': 'EmprenderFem',
      'sonar.projectVersion': process.env.SONAR_PROJECT_VERSION || '0.1.0', // útil si defines "New Code = Previous version" en la UI

      // Código fuente
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.sources': 'src,frontend/src',

      // Tests y cobertura
      'sonar.tests': 'src,frontend/src',
      'sonar.test.inclusions': '**/*.test.*,**/*.spec.*',
      'sonar.javascript.lcov.reportPaths': coverageReports,
      'sonar.typescript.tsconfigPaths': 'frontend/tsconfig.json',

      // Archivos a excluir del análisis (ruido/generados)
      'sonar.exclusions': [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.scannerwork/**',
        '**/coverage/**',
        'frontend/src/vite-env.d.ts',
        'frontend/src/**/*.d.ts'
      ].join(','),

      // Archivos que NO cuentan para cobertura (bootstrap/seed/stories, etc.)
      'sonar.coverage.exclusions': [
        'seed.js',
        'src/server.js',
        'src/**/index.*',
        'src/**/schema/**',
        'frontend/src/main.*',
        'frontend/src/**/__mocks__/**',
        'frontend/src/**/*.stories.*'
      ].join(','),

      // Verbose (cámbialo a 'true' si necesitas debug)
      'sonar.verbose': 'false'
    }
  },
  () => process.exit() // fin
);
