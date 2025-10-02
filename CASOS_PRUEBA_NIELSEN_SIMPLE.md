# 📋 Casos de Prueba Nielsen - EmprenderFem
## 20 Casos Prácticos para Implementar

---

## 1️⃣ Visibilidad del Estado del Sistema

### **Caso 1.1: Spinner al Iniciar Sesión**
**Descripción:** Informar al usuario qué está pasando en todo momento.  
**Escenario:** Al hacer clic en "Iniciar Sesión".  
**Implementación:**
- Spinner de carga (CircularProgress)
- Texto "Iniciando sesión..."
- Deshabilitar botón mientras carga

**Beneficio:** Usuario sabe que está procesando.  
**Sin esto:** Haría clic múltiples veces.

---

### **Caso 1.2: Confirmación al Inscribirse en Curso**
**Descripción:** Confirmar acciones completadas.  
**Escenario:** Al inscribirse en un curso.  
**Implementación:**
- Toast/Snackbar "¡Inscrito exitosamente!"
- Botón cambia a "Inscrito" (verde)
- Ícono check ✓

**Beneficio:** Confirma que funcionó.  
**Sin esto:** No sabría si quedó inscrita.

---

## 2️⃣ Concordancia con el Mundo Real

### **Caso 2.1: Lenguaje Simple en Préstamos**
**Descripción:** Usar lenguaje familiar, no técnico.  
**Escenario:** Formulario de solicitud de préstamo.  
**Implementación:**
- "¿Cuánto dinero necesitas?" (no "Monto del crédito")
- "$500,000 COP" (formato local)
- "Cuota mensual" (no "Amortización")

**Beneficio:** Fácil de entender para todos.  
**Sin esto:** Confusión y abandono.

---

### **Caso 2.2: Dashboard Organizado por Prioridad**
**Descripción:** Organizar info de forma natural.  
**Escenario:** Al entrar al dashboard.  
**Implementación:**
- Arriba: Alertas urgentes (pagos pendientes)
- Medio: Acciones principales (botones grandes)
- Abajo: Estadísticas generales

**Beneficio:** Encuentra lo importante rápido.  
**Sin esto:** Perdería tiempo buscando.

---

## 3️⃣ Control y Libertad del Usuario

### **Caso 3.1: Botón Cancelar en Formularios**
**Descripción:** Permitir salir de procesos fácilmente.  
**Escenario:** Llenando formulario de préstamo.  
**Implementación:**
- Botón "Cancelar" visible siempre
- Modal "¿Segura que quieres cancelar?"
- Opción "Guardar borrador"

**Beneficio:** Usuario no se siente atrapado.  
**Sin esto:** Frustración y ansiedad.

---

### **Caso 3.2: Deshacer Eliminación**
**Descripción:** Permitir deshacer acciones.  
**Escenario:** Eliminar curso accidentalmente.  
**Implementación:**
- Snackbar "Curso eliminado"
- Botón "Deshacer" (5 segundos)
- Animación de salida lenta

**Beneficio:** Previene pérdida de datos.  
**Sin esto:** Pérdida irreversible, frustración.

---

## 4️⃣ Consistencia y Estándares

### **Caso 4.1: Botones Consistentes**
**Descripción:** Mismo estilo en toda la app.  
**Escenario:** Todos los botones principales.  
**Implementación:**
- Color rosa (#E91E63) para primarios
- Siempre en esquina inferior derecha
- Mismo tamaño y padding

**Beneficio:** Usuario aprende una vez.  
**Sin esto:** Confusión en cada pantalla.

---

### **Caso 4.2: Iconos Estándar**
**Descripción:** Usar iconos universales.  
**Escenario:** Menú de navegación.  
**Implementación:**
- 👤 Perfil
- 📚 Cursos
- 💰 Préstamos
- 🚪 Salir

**Beneficio:** Reconocimiento inmediato.  
**Sin esto:** Confusión sobre funciones.

---

## 5️⃣ Prevención de Errores

### **Caso 5.1: Validación en Tiempo Real**
**Descripción:** Validar mientras el usuario escribe.  
**Escenario:** Formulario de registro.  
**Implementación:**
- Borde rojo si error, verde si correcto
- Mensaje bajo el campo
- "Email ya registrado" inmediato

**Beneficio:** Evita errores al enviar.  
**Sin esto:** Múltiples intentos fallidos.

---

### **Caso 5.2: Confirmación de Préstamo**
**Descripción:** Confirmar acciones críticas.  
**Escenario:** Antes de enviar solicitud de préstamo.  
**Implementación:**
- Modal con resumen completo
- Monto, cuota mensual, total a pagar
- Checkbox "Acepto términos"
- Botón "Confirmar Solicitud"

**Beneficio:** Usuario entiende compromiso.  
**Sin esto:** Sorpresas desagradables después.

---

## 6️⃣ Reconocimiento vs Recuerdo

### **Caso 6.1: Badges en Cursos**
**Descripción:** Mostrar estado sin que recuerde.  
**Escenario:** Navegando catálogo de cursos.  
**Implementación:**
- Badge "En progreso 45%"
- Badge "Completado ✓"
- Badge "Visitado"

**Beneficio:** No tiene que recordar qué vio.  
**Sin esto:** Revisaría cursos repetidamente.

---

### **Caso 6.2: Historial de Cursos Recientes**
**Descripción:** Mostrar cursos visitados recientemente.  
**Escenario:** En el dashboard o sección de cursos.  
**Implementación:**
- Sección "Continuar viendo" con últimos 3 cursos
- Mostrar fecha de último acceso
- Thumbnail del curso + progreso visual

**Beneficio:** Retoma fácilmente donde quedó.  
**Sin esto:** Tendría que buscar el curso de nuevo.

---

## 7️⃣ Flexibilidad y Eficiencia

### **Caso 7.1: Búsqueda Rápida de Cursos**
**Descripción:** Encontrar cursos rápidamente.  
**Escenario:** Buscando un curso específico.  
**Implementación:**
- Barra de búsqueda con autocompletado
- Buscar por título, categoría o instructor
- Mostrar resultados mientras escribe
- Resaltar coincidencias en los resultados

**Beneficio:** Encuentra cursos al instante.  
**Sin esto:** Perdería tiempo navegando categorías.

---

### **Caso 7.2: Ordenamiento de Cursos**
**Descripción:** Ordenar cursos según preferencias.  
**Escenario:** Viendo el catálogo de cursos.  
**Implementación:**
- Dropdown "Ordenar por:"
- Opciones: Más recientes, Más populares, Duración (corta a larga), Alfabético
- Recordar última opción seleccionada
- Cambio instantáneo al seleccionar

**Beneficio:** Ve primero lo que le interesa.  
**Sin esto:** Cursos en orden aleatorio.

---

## 8️⃣ Diseño Minimalista

### **Caso 8.1: Dashboard Limpio**
**Descripción:** Solo info importante visible.  
**Escenario:** Pantalla principal.  
**Implementación:**
- Máximo 3-4 tarjetas principales
- Espaciado generoso
- Jerarquía clara (alertas → acciones → stats)

**Beneficio:** Fácil de escanear visualmente.  
**Sin esto:** Abrumación y confusión.

---

### **Caso 8.2: Formulario por Pasos**
**Descripción:** Dividir formularios largos.  
**Escenario:** Solicitud de préstamo.  
**Implementación:**
- Paso 1: Monto y propósito (2 campos)
- Paso 2: Plazo y fecha (2 campos)
- Paso 3: Confirmación
- Indicador "Paso 2 de 3"

**Beneficio:** Menos intimidante.  
**Sin esto:** Abandono por abrumación.

---

## 9️⃣ Recuperación de Errores

### **Caso 9.1: Error Claro en Login**
**Descripción:** Mensajes de error comprensibles.  
**Escenario:** Login fallido.  
**Implementación:**
- "Email o contraseña incorrectos" (no "Error 401")
- Link "¿Olvidaste tu contraseña?"
- Sugerencia "Verifica Bloq Mayús"

**Beneficio:** Usuario sabe qué hacer.  
**Sin esto:** Confusión sobre el problema.

---

### **Caso 9.2: Sugerencias en Errores**
**Descripción:** Ofrecer soluciones, no solo errores.  
**Escenario:** Monto de préstamo inválido.  
**Implementación:**
- "Mínimo $100,000. Te sugerimos $500,000"
- Slider mostrando rango válido
- "Montos populares: $500k, $1M, $2M"

**Beneficio:** Aprende y corrige fácil.  
**Sin esto:** Múltiples intentos sin guía.

---

## 🔟 Ayuda y Documentación

### **Caso 10.1: Tooltips en Formularios**
**Descripción:** Ayuda contextual sin salir.  
**Escenario:** Campos complejos en formularios.  
**Implementación:**
- Ícono (?) junto a términos técnicos
- Tooltip al hover con explicación breve
- Ejemplo: "Tasa de interés: 2.5% mensual = $25 por cada $1000"

**Beneficio:** Ayuda justo cuando se necesita.  
**Sin esto:** Abandono por confusión.

---

### **Caso 10.2: Centro de Ayuda**
**Descripción:** Documentación fácil de buscar.  
**Escenario:** Usuario tiene dudas.  
**Implementación:**
- Barra de búsqueda "¿En qué podemos ayudarte?"
- Categorías: Cursos, Préstamos, Cuenta
- FAQ con las 10 preguntas más comunes
- Botón "Contáctanos" si no encuentra respuesta

**Beneficio:** Resuelve dudas sin esperar.  
**Sin esto:** Saturación de soporte.

---

## ✅ Checklist de Implementación

Para validar cada caso:

- [ ] ¿El elemento existe en la interfaz?
- [ ] ¿Funciona correctamente?
- [ ] ¿Mejora la experiencia del usuario?
- [ ] ¿Es consistente en toda la app?
- [ ] ¿Es fácil de usar?

---

## 📊 Resumen Rápido

| # | Principio | Casos | Fácil de Implementar |
|---|-----------|-------|---------------------|
| 1 | Visibilidad | Spinner, Confirmaciones | ⭐⭐⭐ |
| 2 | Mundo Real | Lenguaje simple, Orden | ⭐⭐⭐ |
| 3 | Control | Cancelar, Deshacer | ⭐⭐ |
| 4 | Consistencia | Botones, Iconos | ⭐⭐⭐ |
| 5 | Prevención | Validación, Confirmación | ⭐⭐ |
| 6 | Reconocimiento | Badges, Historial reciente | ⭐⭐⭐ |
| 7 | Flexibilidad | Búsqueda rápida, Ordenamiento | ⭐⭐ |
| 8 | Minimalista | Dashboard, Pasos | ⭐⭐⭐ |
| 9 | Errores | Mensajes claros | ⭐⭐⭐ |
| 10 | Ayuda | Tooltips, FAQ | ⭐⭐ |

**⭐⭐⭐ = Muy fácil | ⭐⭐ = Moderado | ⭐ = Requiere más trabajo**

---

**Proyecto Académico - EmprenderFem**  
**Total: 20 casos de prueba listos para implementar**
