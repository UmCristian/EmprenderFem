Guía rápida: Registrar una usuaria vía GraphQL

Este archivo explica, paso a paso, cómo crear (registrar) una usuaria en la API GraphQL del proyecto.

Contenido
- 1) Requisitos previos
- 2) Arrancar el servidor
- 3) Endpoint GraphQL
- 4) Mutación de registro (registerUser)
- 5) Ejemplos de uso
- 6) Errores comunes y solución
- 7) Notas de seguridad

1) Requisitos previos
- Tener Node.js instalado y las dependencias del proyecto instaladas: npm install
- Tener una base de datos MongoDB accesible.
  - Por defecto, el proyecto usa: mongodb://localhost:27017/empoderar-mujeres
  - Puedes cambiarla con la variable de entorno DB_URI (ver src/config.js)
- (Opcional) Definir variables de entorno recomendadas:
  - DB_URI: cadena de conexión de MongoDB
  - JWT_SECRET: secreto para firmar tokens JWT
  - PORT: puerto del servidor (por defecto 4000)
  - NODE_ENV: entorno (development/production)
  - CORS_ORIGIN: origen permitido para CORS (por defecto http://localhost:3000)

2) Arrancar el servidor
- En la raíz del proyecto, ejecuta:
  npm run dev
  o bien
  node src/server.js
- Si todo está correcto, verás algo como:
  "🚀 Servidor GraphQL ejecutándose en http://localhost:4000/"

3) Endpoint GraphQL
- Por defecto: http://localhost:4000/
- El servidor usa Apollo Server v4 en modo standalone (ver src/server.js).

4) Mutación de registro (registerUser)
- Definida en el esquema: src/schema/index.js (type Mutation -> registerUser)
- Implementación: src/resolvers/auth.js (Mutation.registerUser)
- Argumentos requeridos:
  - name: String!
  - email: String!
  - password: String! (mínimo 6 caracteres)
- Argumentos opcionales:
  - phone: String
  - address: String
  - identification: String
  - role: Role (beneficiary | mentor | admin) -> por defecto: beneficiary
- Respuesta: AuthPayload { token, user }
  - token: JWT para autenticación posterior
  - user: objeto usuario sin el campo password

5) Ejemplos de uso
5.1) GraphQL Playground / Apollo Sandbox
Mutation:
mutation Register {
  registerUser(
    name: "María Pérez"
    email: "maria@example.com"
    password: "Secreta123"
    phone: "3001234567"
    address: "Calle 123"
    identification: "CC-123456789"
    role: beneficiary
  ) {
    token
    user {
      id
      name
      email
      role
      createdAt
    }
  }
}

5.2) curl (línea de comandos)
Windows PowerShell (usa comillas simples para el body JSON anidado):

curl -Method POST `
  -Uri "http://localhost:4000/" `
  -ContentType "application/json" `
  -Body '{
    "query": "mutation Register($inputName: String!, $inputEmail: String!, $inputPassword: String!) { registerUser(name: $inputName, email: $inputEmail, password: $inputPassword) { token user { id name email role } } }",
    "variables": { "inputName": "María Pérez", "inputEmail": "maria@example.com", "inputPassword": "Secreta123" }
  }'

5.3) Postman / Insomnia
- Método: POST
- URL: http://localhost:4000/
- Headers:
  - Content-Type: application/json
- Body (raw, JSON):
{
  "query": "mutation Register($name: String!, $email: String!, $password: String!) { registerUser(name: $name, email: $email, password: $password) { token user { id name email role } } }",
  "variables": {
    "name": "María Pérez",
    "email": "maria@example.com",
    "password": "Secreta123"
  }
}

6) Errores comunes y solución
- Email duplicado
  Mensaje: "El usuario con este email ya existe"
  Causa: ya hay un documento User con ese email.
  Solución: usar otro email o borrar el usuario previo en la base de datos.

- MongoDB no disponible / cadena DB_URI incorrecta
  Síntoma: el servidor no arranca o las operaciones fallan con errores de conexión.
  Solución: valida que MongoDB está corriendo y que DB_URI apunta al host/puerto correctos.

- Validación de contraseña
  Síntoma: error por longitud mínima (< 6)
  Solución: usar una contraseña 6+ caracteres.

- CORS (si llamas desde un frontend)
  Síntoma: error en el navegador por política de CORS.
  Solución: establece CORS_ORIGIN en el .env o ajusta la configuración para permitir el origen del frontend.

- Enum Role inválido
  Síntoma: error de GraphQL por valor no permitido.
  Solución: usar uno de: beneficiary | mentor | admin (o no enviar role para usar el default).

7) Notas de seguridad
- Cambia el JWT_SECRET en producción (no uses el valor por defecto de desarrollo).
- Usa HTTPS en producción para proteger credenciales y tokens.
- Aplica validaciones adicionales según tus políticas (formato de email, contraseñas robustas, etc.).

Referencias en el código
- Esquema: src/schema/index.js (type Mutation.registerUser)
- Resolver: src/resolvers/auth.js (Mutation.registerUser)
- Modelo y hashing: src/models/User.js (pre save -> bcrypt)
- Configuración: src/config.js
- Servidor: src/server.js
