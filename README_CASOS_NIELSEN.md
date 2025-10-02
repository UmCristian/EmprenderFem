# 🎨 Casos de Prueba - Principios de Usabilidad de Nielsen
### 📱 Proyecto: EmprenderFem - Plataforma de Emprendimientos Inclusivos

<div align="center">

**📊 Nielsen: 10 Principios** | **📝 Casos de Prueba: 20** | **✅ Estado: Listo para Implementar**

</div>

---

## 👥 Integrantes del Equipo

<div align="center">

| 👨‍💻 Nombre | 🎓 Rol |
|------------|--------|
| **David Felipe Rojas Botero** | Desarrollador Full-Stack |
| **Cristian Giovanny Salazar Moreras** | Desarrollador Full-Stack |
| **Victor Alfonso Alarcon Ospina** | Desarrollador Full-Stack |

</div>

---

## 🎯 Introducción

Este documento contiene **20 casos de prueba** basados en los **10 principios de usabilidad de Jakob Nielsen**, aplicados específicamente al proyecto **EmprenderFem**. Cada principio cuenta con **2 casos de prueba** detallados y listos para implementar.

### 🎨 Estructura de cada caso:

```
📝 Descripción: Qué es el principio
🎬 Escenario: Dónde se aplica
⚙️ Implementación: Cómo hacerlo
✨ Beneficio: Para qué sirve
⚠️ Sin esto: Qué pasa si no se aplica
```

---

## 1️⃣ Visibilidad del Estado del Sistema

> 💡 **Principio:** El sistema debe mantener informado al usuario sobre lo que está sucediendo en todo momento.

### 🔄 Caso 1.1: Spinner al Iniciar Sesión

<table>
<tr><td>📝 <b>Descripción</b></td><td>Informar al usuario qué está pasando en todo momento</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Al hacer clic en el botón "Iniciar Sesión"</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Agregar `CircularProgress` de Material-UI<br>
• Mostrar texto "Iniciando sesión..."<br>
• Deshabilitar el botón mientras carga<br>
• Cambiar cursor a "wait"

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>El usuario sabe que el sistema está procesando su solicitud</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>El usuario haría clic múltiples veces pensando que no funcionó</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

### ✅ Caso 1.2: Confirmación al Inscribirse en Curso

<table>
<tr><td>📝 <b>Descripción</b></td><td>Confirmar que las acciones se completaron exitosamente</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Al inscribirse en un curso (ej: "Emprendimiento Básico")</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Mostrar Snackbar/Toast "¡Inscrito exitosamente!"<br>
• Cambiar botón a "Inscrito" con color verde<br>
• Agregar ícono de check ✓<br>
• Actualizar contador de cursos inscritos

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Confirma que la inscripción funcionó correctamente</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>La usuaria no sabría si quedó inscrita o no</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

## 2️⃣ Concordancia con el Mundo Real

> 💡 **Principio:** El sistema debe hablar el lenguaje del usuario, usando palabras y conceptos familiares.

### 💬 Caso 2.1: Lenguaje Simple en Préstamos

<table>
<tr><td>📝 <b>Descripción</b></td><td>Usar lenguaje familiar y comprensible, no términos técnicos</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Formulario de solicitud de préstamo/microcrédito</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• "¿Cuánto dinero necesitas?" en vez de "Monto del crédito"<br>
• "$500,000 COP" (formato local colombiano)<br>
• "Cuota mensual" en vez de "Amortización"<br>
• "¿Para qué lo necesitas?" en vez de "Propósito del crédito"<br>
• Ejemplos: "$500,000 para máquina de coser"

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Fácil de entender para todos, sin importar nivel educativo</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Confusión, intimidación y abandono del formulario</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

### 📊 Caso 2.2: Dashboard Organizado por Prioridad

<table>
<tr><td>📝 <b>Descripción</b></td><td>Organizar información de forma natural y lógica</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Al entrar al dashboard principal después de login</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• **Arriba:** Alertas urgentes (⚠️ pagos pendientes, 📅 cursos por expirar)<br>
• **Medio:** Acciones principales (🎓 Explorar Cursos, 💰 Solicitar Préstamo)<br>
• **Abajo:** Estadísticas generales (📈 progreso, 🏆 logros)<br>
• Saludo personalizado: "¡Hola María!"

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Encuentra lo importante rápidamente sin buscar</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Perdería tiempo buscando información relevante</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

## 3️⃣ Control y Libertad del Usuario

> 💡 **Principio:** Los usuarios necesitan salidas de emergencia para abandonar estados no deseados.

### ❌ Caso 3.1: Botón Cancelar en Formularios

<table>
<tr><td>📝 <b>Descripción</b></td><td>Permitir salir de procesos fácilmente sin sentirse atrapado</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Llenando formulario de solicitud de préstamo</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Botón "Cancelar" visible en todo momento<br>
• Modal de confirmación: "¿Segura que quieres cancelar?"<br>
• Opción "Guardar borrador" para continuar después<br>
• Botón "Volver" en formularios multi-paso<br>
• Tecla ESC funcional

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Usuario no se siente atrapado, tiene control total</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Frustración, ansiedad y abandono definitivo</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐ Moderado</td></tr>
</table>

---

### ↩️ Caso 3.2: Deshacer Eliminación

<table>
<tr><td>📝 <b>Descripción</b></td><td>Permitir deshacer acciones potencialmente destructivas</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Al eliminar un curso de la lista guardada accidentalmente</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Snackbar inferior: "Curso eliminado"<br>
• Botón "Deshacer" visible por 5-7 segundos<br>
• Animación de salida lenta (no instantánea)<br>
• Countdown visual opcional: "Deshaciendo en 5... 4..."

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Previene pérdida accidental de datos importantes</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Pérdida irreversible de progreso, frustración extrema</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐ Moderado</td></tr>
</table>

---

## 4️⃣ Consistencia y Estándares

> 💡 **Principio:** Los usuarios no deberían preguntarse si diferentes palabras o acciones significan lo mismo.

### 🎨 Caso 4.1: Botones Consistentes

<table>
<tr><td>📝 <b>Descripción</b></td><td>Mantener el mismo estilo visual en toda la aplicación</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Todos los botones de acción primaria en la app</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• **Color primario:** Rosa vibrante (#E91E63)<br>
• **Posición:** Siempre esquina inferior derecha<br>
• **Tamaño:** Mismo height y padding<br>
• **Estados:** Hover, disabled, loading consistentes<br>
• **Jerarquía:** Primario (rosa), Secundario (gris), Destructivo (rojo)

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Usuario aprende una vez y aplica en toda la app</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Confusión en cada pantalla, experiencia caótica</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

### 🎯 Caso 4.2: Iconos Estándar

<table>
<tr><td>📝 <b>Descripción</b></td><td>Usar iconos universalmente reconocidos</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Menú de navegación principal y tarjetas de funcionalidad</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• 👤 **Perfil** - Mi Perfil<br>
• 📚 **Cursos** - Mis Cursos<br>
• 💰 **Préstamos** - Microcréditos<br>
• 📊 **Dashboard** - Panel Principal<br>
• 🚪 **Salir** - Cerrar Sesión<br>
• ⚙️ **Configuración** - Ajustes<br>
• ❓ **Ayuda** - Soporte

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Reconocimiento inmediato, menos dependencia del texto</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Confusión sobre la función de cada sección</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

## 5️⃣ Prevención de Errores

> 💡 **Principio:** Mejor prevenir que un error ocurra mediante diseño cuidadoso.

### ✔️ Caso 5.1: Validación en Tiempo Real

<table>
<tr><td>📝 <b>Descripción</b></td><td>Validar campos mientras el usuario escribe</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Formulario de registro de nueva usuaria</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• **Borde rojo** si hay error, **verde** si es correcto<br>
• Mensaje específico bajo el campo<br>
• "Email ya registrado" - validación inmediata<br>
• Lista de requisitos de contraseña con checks verdes<br>
• Formato automático de teléfono (300-123-4567)<br>
• Botón "Registrar" deshabilitado hasta que todo sea válido

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Evita errores al enviar, guía educativa sobre requisitos</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Múltiples intentos fallidos, frustración y abandono</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐ Moderado</td></tr>
</table>

---

### 🔒 Caso 5.2: Confirmación de Préstamo

<table>
<tr><td>📝 <b>Descripción</b></td><td>Confirmar acciones críticas antes de ejecutarlas</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Antes de enviar solicitud de préstamo de $2,000,000</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• **Modal de confirmación** con resumen completo:<br>
  - 💵 Monto solicitado: $2,000,000<br>
  - 📈 Interés mensual: 2.5%<br>
  - 💳 Cuota mensual: $95,833<br>
  - 💰 Total a pagar: $2,300,000<br>
  - 📅 Plazo: 24 meses<br>
• Checkbox "He leído y acepto los términos"<br>
• Advertencia: "Esta solicitud no se puede cancelar"<br>
• Botones: "Confirmar Solicitud" vs "Revisar Datos"

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Usuario entiende completamente el compromiso financiero</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Sorpresas desagradables, solicitudes no deseadas</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐ Moderado</td></tr>
</table>

---

## 6️⃣ Reconocimiento vs Recuerdo

> 💡 **Principio:** Minimizar la carga de memoria haciendo visible objetos, acciones y opciones.

### 🏷️ Caso 6.1: Badges en Cursos

<table>
<tr><td>📝 <b>Descripción</b></td><td>Mostrar estado visual sin que el usuario tenga que recordar</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Navegando por el catálogo de cursos</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Badge "**En progreso 45%**" (naranja)<br>
• Badge "**Completado ✓**" (verde)<br>
• Badge "**Visitado**" (gris claro)<br>
• Badge "**Nuevo**" (azul)<br>
• Barra de progreso visible en cada tarjeta

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>No tiene que recordar qué cursos ya vio o completó</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Revisaría cursos repetidamente sin recordarlo</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

### 📚 Caso 6.2: Historial de Cursos Recientes

<table>
<tr><td>📝 <b>Descripción</b></td><td>Mostrar cursos visitados recientemente para fácil acceso</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>En el dashboard o sección de cursos</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Sección "**Continuar viendo**" con últimos 3 cursos<br>
• Mostrar fecha de último acceso: "Hace 2 días"<br>
• Thumbnail del curso + barra de progreso visual<br>
• Botón "Ver todos" para historial completo<br>
• Ordenados por más reciente primero

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Retoma fácilmente donde quedó sin buscar</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Tendría que buscar el curso de nuevo cada vez</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

## 7️⃣ Flexibilidad y Eficiencia

> 💡 **Principio:** Permitir que usuarios expertos trabajen más rápido sin afectar a novatos.

### 🔍 Caso 7.1: Búsqueda Rápida de Cursos

<table>
<tr><td>📝 <b>Descripción</b></td><td>Encontrar cursos específicos rápidamente</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Buscando un curso específico en el catálogo</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Barra de búsqueda con **autocompletado**<br>
• Buscar por: título, categoría, instructor<br>
• Mostrar resultados **mientras escribe**<br>
• Resaltar coincidencias en los resultados<br>
• Ícono de lupa 🔍 visible<br>
• Placeholder: "Buscar cursos..."

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Encuentra cursos al instante sin navegar categorías</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Perdería tiempo navegando manualmente</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐ Moderado</td></tr>
</table>

---

### 🎚️ Caso 7.2: Ordenamiento de Cursos

<table>
<tr><td>📝 <b>Descripción</b></td><td>Ordenar cursos según preferencias personales</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Viendo el catálogo completo de cursos</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Dropdown "**Ordenar por:**"<br>
• Opciones:<br>
  - 🆕 Más recientes<br>
  - ⭐ Más populares<br>
  - ⏱️ Duración (corta a larga)<br>
  - 🔤 Alfabético (A-Z)<br>
• Recordar última opción seleccionada<br>
• Cambio instantáneo al seleccionar

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Ve primero los cursos que más le interesan</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Cursos en orden aleatorio, difícil encontrar lo relevante</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐ Moderado</td></tr>
</table>

---

## 8️⃣ Diseño Minimalista

> 💡 **Principio:** Los diálogos no deben contener información irrelevante o raramente necesaria.

### 🎯 Caso 8.1: Dashboard Limpio

<table>
<tr><td>📝 <b>Descripción</b></td><td>Mostrar solo información importante y relevante</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Pantalla principal al iniciar sesión</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• **Máximo 3-4 tarjetas principales** visibles<br>
• Espaciado generoso (white space)<br>
• **Jerarquía clara:**<br>
  1. ⚠️ Alertas urgentes<br>
  2. 🎯 Acciones principales<br>
  3. 📊 Estadísticas generales<br>
• Iconografía simple y minimalista<br>
• Paleta limitada: Rosa, púrpura, gris<br>
• Información expandible en "Ver más"

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Fácil de escanear visualmente, reduce sobrecarga cognitiva</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Abrumación visual, parálisis por análisis</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

### 📝 Caso 8.2: Formulario por Pasos

<table>
<tr><td>📝 <b>Descripción</b></td><td>Dividir formularios largos en pasos simples</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Solicitud de microcrédito (múltiples campos)</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• **Paso 1:** Monto y propósito (2 campos)<br>
• **Paso 2:** Plazo y fecha de inicio (2 campos)<br>
• **Paso 3:** Confirmación y resumen<br>
• Indicador de progreso: "**Paso 2 de 3**"<br>
• Barra de progreso visual<br>
• Botones "Anterior" y "Siguiente" claros<br>
• Guardado automático entre pasos

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Menos intimidante, aumenta tasa de completación</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Abandono del formulario por abrumación</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

## 9️⃣ Recuperación de Errores

> 💡 **Principio:** Los mensajes de error deben ser claros, indicar el problema y sugerir soluciones.

### 🚫 Caso 9.1: Error Claro en Login

<table>
<tr><td>📝 <b>Descripción</b></td><td>Mensajes de error comprensibles en lenguaje humano</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Login fallido por credenciales incorrectas</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• ❌ **MAL:** "Error 401: Unauthorized"<br>
• ✅ **BIEN:** "El email o la contraseña son incorrectos"<br>
• Icono de alerta ⚠️ en color naranja/rojo<br>
• **Sugerencias constructivas:**<br>
  - 🔑 "¿Olvidaste tu contraseña? Recupérala aquí"<br>
  - 📝 "¿Es tu primera vez? Regístrate aquí"<br>
  - ⌨️ "Verifica que no tengas Bloq Mayús activado"<br>
• Campo con error resaltado en rojo

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Usuario sabe exactamente qué hacer para resolver el problema</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Confusión, múltiples intentos fallidos, abandono</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

### 💡 Caso 9.2: Sugerencias en Errores

<table>
<tr><td>📝 <b>Descripción</b></td><td>Ofrecer soluciones específicas, no solo indicar el error</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Monto de préstamo fuera del rango válido</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• **Mensaje constructivo:**<br>
  "El monto mínimo es $100,000 COP. Te sugerimos solicitar al menos $100,000"<br>
• Slider visual mostrando rango válido ($100k - $5M)<br>
• **Sugerencias útiles:**<br>
  - 💰 "Montos populares: $500k, $1M, $2M"<br>
  - 📊 "El 80% de las beneficiarias solicitan entre $500k-$2M"<br>
  - 🧮 "Con $100,000 tu cuota mensual sería de $9,583"<br>
• Formato correcto mostrado: "$1,000,000"

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Transforma el error en oportunidad de aprendizaje</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Múltiples intentos fallidos sin guía clara</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐⭐ Muy fácil</td></tr>
</table>

---

## 🔟 Ayuda y Documentación

> 💡 **Principio:** La ayuda debe ser fácil de buscar, enfocada en la tarea y no demasiado extensa.

### ❓ Caso 10.1: Tooltips en Formularios

<table>
<tr><td>📝 <b>Descripción</b></td><td>Ayuda contextual sin salir del formulario</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Campos complejos en formulario de préstamo</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Ícono **(?)**  junto a términos técnicos<br>
• Tooltip al hover con explicación breve (2-3 líneas)<br>
• **Ejemplos concretos:**<br>
  "Tasa de interés: 2.5% mensual = $25 por cada $1,000"<br>
• Links a videos cortos (30-60 segundos)<br>
• Glosario integrado de términos financieros<br>
• Casos de éxito: "María solicitó $500k para su negocio"

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Ayuda justo cuando se necesita, sin interrumpir el flujo</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Abandono por confusión, solicitudes incorrectas</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐ Moderado</td></tr>
</table>

---

### 📖 Caso 10.2: Centro de Ayuda

<table>
<tr><td>📝 <b>Descripción</b></td><td>Documentación organizada y fácilmente buscable</td></tr>
<tr><td>🎬 <b>Escenario</b></td><td>Usuario tiene dudas sobre cómo usar la plataforma</td></tr>
<tr><td>⚙️ <b>Implementación</b></td><td>
  
• Barra de búsqueda prominente: "**¿En qué podemos ayudarte?**"<br>
• **Categorías claras:**<br>
  - 📚 Cursos y Certificaciones<br>
  - 💰 Préstamos y Pagos<br>
  - 👤 Mi Cuenta y Perfil<br>
  - 🔒 Seguridad y Privacidad<br>
• **FAQ:** Las 10 preguntas más comunes<br>
• Tutoriales paso a paso con capturas<br>
• Búsqueda inteligente con sugerencias<br>
• "¿Te fue útil? 👍 👎"<br>
• Botón "**Contáctanos**" si no encuentra respuesta

</td></tr>
<tr><td>✨ <b>Beneficio</b></td><td>Resuelve dudas sin esperar soporte, disponible 24/7</td></tr>
<tr><td>⚠️ <b>Sin esto</b></td><td>Saturación de soporte, frustración por no poder resolver dudas</td></tr>
<tr><td>🎯 <b>Dificultad</b></td><td>⭐⭐ Moderado</td></tr>
</table>

---

## 📊 Resumen y Priorización

### 🎯 Tabla de Casos por Dificultad

| # | 🎨 Principio | 📝 Casos | 🎯 Dificultad | 🚀 Prioridad |
|---|-------------|----------|---------------|--------------|
| 1 | Visibilidad del Estado | Spinner, Confirmaciones | ⭐⭐⭐ | 🔴 Alta |
| 2 | Mundo Real | Lenguaje simple, Orden | ⭐⭐⭐ | 🔴 Alta |
| 3 | Control y Libertad | Cancelar, Deshacer | ⭐⭐ | 🟡 Media |
| 4 | Consistencia | Botones, Iconos | ⭐⭐⭐ | 🔴 Alta |
| 5 | Prevención de Errores | Validación, Confirmación | ⭐⭐ | 🟡 Media |
| 6 | Reconocimiento | Badges, Historial | ⭐⭐⭐ | 🔴 Alta |
| 7 | Flexibilidad | Búsqueda, Ordenamiento | ⭐⭐ | 🟡 Media |
| 8 | Diseño Minimalista | Dashboard, Pasos | ⭐⭐⭐ | 🔴 Alta |
| 9 | Recuperación de Errores | Mensajes claros | ⭐⭐⭐ | 🔴 Alta |
| 10 | Ayuda | Tooltips, FAQ | ⭐⭐ | 🟢 Baja |

**Leyenda:**
- ⭐⭐⭐ = Muy fácil de implementar
- ⭐⭐ = Dificultad moderada
- ⭐ = Requiere más trabajo

---

### 🚀 Plan de Implementación Sugerido

#### **Fase 1: Fundamentos (Semana 1-2)** 🔴
Implementar casos **muy fáciles** y de **alta prioridad**:

1. ✅ Spinner al cargar (1.1)
2. ✅ Confirmaciones con toast (1.2)
3. ✅ Lenguaje simple (2.1)
4. ✅ Dashboard organizado (2.2)
5. ✅ Botones consistentes (4.1)
6. ✅ Iconos estándar (4.2)
7. ✅ Badges en cursos (6.1)
8. ✅ Dashboard limpio (8.1)
9. ✅ Mensajes de error claros (9.1, 9.2)

#### **Fase 2: Interacciones (Semana 3)** 🟡
Implementar casos de **dificultad moderada**:

10. ✅ Botón cancelar (3.1)
11. ✅ Deshacer eliminación (3.2)
12. ✅ Validación en tiempo real (5.1)
13. ✅ Confirmación de préstamo (5.2)
14. ✅ Búsqueda rápida (7.1)
15. ✅ Ordenamiento (7.2)

#### **Fase 3: Refinamiento (Semana 4)** 🟢
Implementar casos **complementarios**:

16. ✅ Historial de cursos (6.2)
17. ✅ Formulario por pasos (8.2)
18. ✅ Tooltips (10.1)
19. ✅ Centro de ayuda (10.2)

---

## ✅ Checklist de Validación

Para cada caso implementado, verificar:

- [ ] 🎨 **Existe visualmente** - El elemento está presente en la interfaz
- [ ] ⚙️ **Funciona correctamente** - Cumple con la funcionalidad descrita
- [ ] 👥 **Mejora la UX** - Realmente beneficia al usuario
- [ ] 🔄 **Es consistente** - Se aplica en todos los contextos relevantes
- [ ] ♿ **Es accesible** - Funciona para todos los usuarios
- [ ] 📱 **Es responsive** - Se adapta a diferentes tamaños de pantalla

---

## 📈 Métricas de Éxito

### KPIs para medir el impacto:

| Métrica | Antes | Meta | Cómo medir |
|---------|-------|------|------------|
| 📊 Tasa de completación de registro | - | >80% | Analytics |
| ⏱️ Tiempo promedio de solicitud de préstamo | - | <5 min | Analytics |
| 😊 Satisfacción del usuario | - | >4.5/5 | Encuestas |
| 🎯 Tasa de inscripción a cursos | - | >60% | Analytics |
| ❌ Tasa de errores en formularios | - | <10% | Logs |
| 🔄 Usuarios que regresan | - | >50% | Analytics |

---

## 🎓 Recursos Adicionales

### 📚 Documentación de Referencia:
- [Nielsen Norman Group - 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [Material-UI Components](https://mui.com/material-ui/getting-started/)
- [React Best Practices](https://react.dev/learn)

### 🛠️ Herramientas Útiles:
- **Figma** - Para diseñar prototipos
- **Lighthouse** - Para auditar accesibilidad
- **React DevTools** - Para debugging
- **Hotjar** - Para analizar comportamiento de usuarios

---

## 👥 Equipo y Contacto

**Proyecto:** EmprenderFem - Plataforma de Emprendimientos Inclusivos  
**Propósito:** Entrega Final de Parcial - Principios de Nielsen  
**Fecha:** Octubre 2025

---

<div align="center">

### 💪 ¡Empoderando mujeres, transformando comunidades!

**Tecnologías:** React 18 • Material-UI 5 • GraphQL API • Node.js

**"Cuando una mujer se empodera, toda la comunidad se fortalece"**

</div>
