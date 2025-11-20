// Script para corregir paths de Windows a Unix en reportes ESLint
const fs = require('fs');
const path = require('path');

function fixPaths(inputFile, outputFile, basePath) {
  const content = fs.readFileSync(inputFile, 'utf8');
  const report = JSON.parse(content);
  
  if (report.issues) {
    report.issues = report.issues.map(issue => {
      if (issue.primaryLocation && issue.primaryLocation.filePath) {
        // Convertir backslashes a forward slashes
        let filePath = issue.primaryLocation.filePath.replace(/\\/g, '/');
        
        // Agregar el basePath si es necesario
        if (basePath && !filePath.startsWith(basePath)) {
          filePath = basePath + '/' + filePath;
        }
        
        issue.primaryLocation.filePath = filePath;
      }
      return issue;
    });
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));
  console.log(`✅ Fixed paths in ${outputFile}`);
  console.log(`   Issues: ${report.issues.length}`);
}

// Fix backend report (no basePath needed)
if (fs.existsSync('eslint-back-sonar.json')) {
  fixPaths('eslint-back-sonar.json', 'eslint-back-sonar.json', null);
}

// Fix frontend report (add frontend/ basePath)
if (fs.existsSync('frontend/eslint-front-sonar.json')) {
  fixPaths('frontend/eslint-front-sonar.json', 'frontend/eslint-front-sonar.json', 'frontend');
}

console.log('\n✅ All paths fixed! Run SonarQube analysis again.');
