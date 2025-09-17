// sonar-runner.js
const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',                 // tu SonarQube local
    token: process.env.SONAR_TOKEN,                     // pon tu token en env
    options: {
      'sonar.projectKey': 'emprenderfem',
      'sonar.projectName': 'EmprenderFem',
      'sonar.sourceEncoding': 'UTF-8',
      // código a analizar (back y front)
      'sonar.sources': 'src,frontend/src',
      // tests y cobertura (opcional; ajusta si los generas)
      'sonar.test.inclusions': '**/*.test.* , **/*.spec.*',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info,frontend/coverage/lcov.info',
      // TypeScript del front (si usas TS)
      'sonar.typescript.tsconfigPaths': 'frontend/tsconfig.json',
      // excluir basura
      'sonar.exclusions': '**/node_modules/**,**/dist/**,**/build/**,**/coverage/**'
    }
  },
  () => process.exit() // fin
);
