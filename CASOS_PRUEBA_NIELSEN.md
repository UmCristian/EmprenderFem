# 📋 Casos de Prueba - Principios de Nielsen (Simplificados)
## Proyecto: EmprenderFem

---

## 1️⃣ Visibilidad del Estado del Sistema

### **Caso 1.1: Spinner al Iniciar Sesión**

**Descripción:** El sistema debe informar al usuario qué está pasando en todo momento.

**Escenario:** Al hacer clic en "Iniciar Sesión", mostrar un indicador de carga.

**Implementación:**
- Agregar un `CircularProgress` de Material-UI
- Mostrar texto "Iniciando sesión..."
- Deshabilitar el botón mientras carga

**Beneficio:** El usuario sabe que el sistema está procesando su solicitud.

**Sin esto:** El usuario haría clic varias veces pensando que no funcionó.

---

### **Caso 1.2: Mensaje de Confirmación al Inscribirse**

**Descripción:** Confirmar que las acciones se completaron exitosamente.

**Escenario:** Al inscribirse en un curso, mostrar confirmación visual.

**Implementación:**
- Mostrar notificación toast "¡Inscrito exitosamente!"
- Cambiar botón a "Inscrito" con color verde
- Agregar ícono de check ✓

**Beneficio:** Confirma que la inscripción funcionó.

**Sin esto:** La usuaria no sabría si quedó inscrita o no.

---

## 2️⃣ PRINCIPIO 2: Concordancia entre el Sistema y el Mundo Real

### **CASO DE PRUEBA 2.1: Lenguaje Inclusivo en Formulario de Préstamo**

**Descripción del principio:**
El sistema debe hablar el lenguaje del usuario, usando palabras, frases y conceptos familiares para él, en lugar de términos técnicos. La información debe aparecer en un orden natural y lógico.

**Escenario de aplicación:**
Cuando una mujer cabeza de hogar solicita un microcrédito para su emprendimiento, el formulario debe usar términos cotidianos y comprensibles, evitando jerga financiera compleja que podría confundir a usuarios sin formación bancaria.

**Elementos del diseño que aplican este principio:**
- **Etiquetas en lenguaje simple**: "¿Cuánto dinero necesitas?" en lugar de "Monto del crédito solicitado"
- **Ejemplos contextuales**: "$500,000 para comprar máquina de coser"
- **Iconos representativos**: 💰 para dinero, 📅 para plazo, 💳 para pagos
- **Tooltips explicativos**: Información adicional en lenguaje sencillo
- **Formato de moneda local**: $100.000 COP (pesos colombianos)
- **Términos familiares**: "Cuota mensual" en lugar de "Amortización"

**Cómo beneficia la experiencia del usuario:**
- Hace el proceso accesible para personas sin conocimientos financieros
- Reduce la intimidación que pueden causar los términos bancarios
- Aumenta la comprensión de los compromisos financieros
- Empodera a las usuarias al entender claramente lo que solicitan
- Facilita la toma de decisiones informadas

**Posibles consecuencias de no aplicarlo:**
- Las usuarias podrían no entender qué están solicitando
- Aumentaría el abandono del formulario por confusión
- Podrían cometer errores al llenar la información
- Generaría desconfianza hacia la plataforma
- Perpetuaría la exclusión financiera que el proyecto busca combatir

---

### **CASO DE PRUEBA 2.2: Organización Natural del Dashboard**

**Descripción del principio:**
La información y las funciones deben organizarse siguiendo convenciones del mundo real y el flujo mental natural del usuario.

**Escenario de aplicación:**
Cuando una beneficiaria accede a su dashboard principal después de iniciar sesión, la información debe estar organizada de manera que refleje sus prioridades y flujo de trabajo natural: primero lo más urgente/importante, luego acciones disponibles, y finalmente información complementaria.

**Elementos del diseño que aplican este principio:**
- **Sección superior**: Saludo personalizado "¡Hola María!" y resumen de estado actual
- **Tarjetas de alerta**: Pagos pendientes o cursos por completar (lo urgente primero)
- **Acciones principales**: Botones grandes para "Explorar Cursos" y "Solicitar Préstamo"
- **Progreso visual**: Gráficos de cursos en progreso con porcentajes
- **Sección de logros**: Certificados obtenidos y metas alcanzadas
- **Orden cronológico**: Actividad reciente de más nueva a más antigua

**Cómo beneficia la experiencia del usuario:**
- Facilita la navegación intuitiva sin necesidad de aprendizaje
- Prioriza la información según importancia real
- Reduce el tiempo para encontrar lo que necesita
- Crea una experiencia familiar y cómoda
- Aumenta la eficiencia en el uso de la plataforma

**Posibles consecuencias de no aplicarlo:**
- La usuaria se sentiría desorientada al entrar al sistema
- Perdería tiempo buscando información importante
- Podría pasar por alto alertas o acciones urgentes
- Aumentaría la curva de aprendizaje de la plataforma
- Generaría frustración y posible abandono

---

## 3️⃣ PRINCIPIO 3: Control y Libertad del Usuario

### **CASO DE PRUEBA 3.1: Cancelar Solicitud de Préstamo en Proceso**

**Descripción del principio:**
Los usuarios a menudo eligen funciones del sistema por error y necesitan una "salida de emergencia" claramente marcada para abandonar el estado no deseado sin tener que pasar por un diálogo extendido.

**Escenario de aplicación:**
Cuando una beneficiaria está llenando el formulario de solicitud de préstamo pero decide que no quiere continuar (por ejemplo, se dio cuenta que necesita más información o cambió de opinión), debe poder cancelar fácilmente sin perder tiempo ni sentirse atrapada.

**Elementos del diseño que aplican este principio:**
- **Botón "Cancelar"**: Visible en todo momento, ubicado junto al botón "Continuar"
- **Confirmación de cancelación**: Dialog modal preguntando "¿Segura que deseas cancelar?"
- **Opción de guardar borrador**: "Guardar y continuar después" para no perder el progreso
- **Botón "Volver"**: En cada paso del formulario multi-paso
- **Tecla ESC**: Funcional para cerrar el formulario
- **Ícono de cerrar (X)**: En la esquina superior derecha

**Cómo beneficia la experiencia del usuario:**
- Da sensación de control sobre sus acciones
- Reduce el estrés de sentirse "atrapada" en un proceso
- Permite explorar sin miedo a consecuencias irreversibles
- Respeta el tiempo y decisiones de la usuaria
- Aumenta la confianza para experimentar con la plataforma

**Posibles consecuencias de no aplicarlo:**
- La usuaria se sentiría forzada a completar algo que no desea
- Podría enviar información incorrecta solo para salir del formulario
- Generaría ansiedad y frustración
- Aumentaría el abandono definitivo de la plataforma
- Crearía una experiencia negativa que compartiría con otras usuarias

---

### **CASO DE PRUEBA 3.2: Deshacer Eliminación de Curso del Perfil**

**Descripción del principio:**
El sistema debe permitir deshacer y rehacer acciones fácilmente, especialmente aquellas que pueden ser destructivas o difíciles de revertir.

**Escenario de aplicación:**
Cuando una beneficiaria elimina accidentalmente un curso de su lista de cursos guardados o en progreso, debe tener la oportunidad inmediata de deshacer esta acción antes de que sea permanente.

**Elementos del diseño que aplican este principio:**
- **Snackbar de confirmación**: Mensaje emergente inferior "Curso eliminado"
- **Botón "Deshacer"**: Visible durante 5-7 segundos en el snackbar
- **Animación de salida**: El curso se desvanece lentamente, no desaparece instantáneamente
- **Confirmación para acciones críticas**: Modal de confirmación para eliminar progreso significativo
- **Historial de acciones**: Opción de ver y restaurar cursos eliminados recientemente
- **Indicador de tiempo**: Countdown visual "Deshaciendo en 5... 4... 3..."

**Cómo beneficia la experiencia del usuario:**
- Previene la pérdida accidental de datos importantes
- Reduce el miedo a cometer errores
- Permite explorar funciones sin consecuencias permanentes
- Aumenta la confianza en el uso de la plataforma
- Mejora la satisfacción general al evitar frustraciones

**Posibles consecuencias de no aplicarlo:**
- Pérdida irreversible de progreso en cursos
- Frustración extrema por errores accidentales
- Miedo a interactuar con funciones de eliminación
- Necesidad de contactar soporte para recuperar información
- Abandono de la plataforma por una mala experiencia

---

## 4️⃣ PRINCIPIO 4: Consistencia y Estándares

### **CASO DE PRUEBA 4.1: Botones de Acción Primaria Consistentes**

**Descripción del principio:**
Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo. Se deben seguir convenciones de la plataforma y del sector.

**Escenario de aplicación:**
A lo largo de toda la plataforma (login, registro, solicitud de préstamo, inscripción a cursos), los botones de acción primaria deben mantener el mismo estilo visual, posición y comportamiento para que la usuaria sepa instintivamente cómo proceder.

**Elementos del diseño que aplican este principio:**
- **Color consistente**: Todos los botones primarios en rosa vibrante (#E91E63)
- **Posición estándar**: Botones de acción siempre en la parte inferior derecha
- **Tamaño uniforme**: Misma altura y padding en todos los botones principales
- **Texto consistente**: "Continuar", "Guardar", "Enviar" según contexto estándar
- **Iconos coherentes**: Flecha derecha (→) para avanzar, check (✓) para confirmar
- **Estados visuales**: Hover, disabled, loading siempre con el mismo estilo
- **Jerarquía clara**: Primario (rosa), secundario (gris), destructivo (rojo)

**Cómo beneficia la experiencia del usuario:**
- Reduce la carga cognitiva al navegar
- Acelera el aprendizaje de la interfaz
- Crea una experiencia predecible y confiable
- Minimiza errores por confusión
- Aumenta la eficiencia en tareas repetitivas

**Posibles consecuencias de no aplicarlo:**
- La usuaria tendría que "reaprender" cada pantalla
- Aumentaría el tiempo de completar tareas
- Generaría confusión sobre qué botón usar
- Crearía una experiencia caótica y poco profesional
- Reduciría la confianza en la plataforma

---

### **CASO DE PRUEBA 4.2: Iconografía Estándar en Navegación**

**Descripción del principio:**
Los iconos y símbolos deben seguir convenciones universalmente reconocidas para facilitar el reconocimiento inmediato de funciones.

**Escenario de aplicación:**
En el menú de navegación principal y en las tarjetas de funcionalidades, los iconos deben usar símbolos estándar que las usuarias reconozcan inmediatamente sin necesidad de leer el texto.

**Elementos del diseño que aplican este principio:**
- **Icono de perfil**: Silueta de persona (👤) para "Mi Perfil"
- **Icono de cursos**: Libro abierto (📚) para "Mis Cursos"
- **Icono de préstamos**: Billete o monedas (💰) para "Microcréditos"
- **Icono de dashboard**: Gráfico o cuadrícula (📊) para "Panel Principal"
- **Icono de salir**: Puerta con flecha (🚪→) para "Cerrar Sesión"
- **Icono de configuración**: Engranaje (⚙️) para "Ajustes"
- **Icono de ayuda**: Signo de interrogación (❓) para "Soporte"

**Cómo beneficia la experiencia del usuario:**
- Facilita la navegación visual rápida
- Reduce dependencia de la alfabetización
- Hace la interfaz más accesible
- Acelera el reconocimiento de funciones
- Crea una experiencia internacional y universal

**Posibles consecuencias de no aplicarlo:**
- Confusión sobre la función de cada sección
- Mayor tiempo para encontrar funcionalidades
- Exclusión de usuarias con menor alfabetización
- Necesidad de memorizar ubicaciones en lugar de reconocerlas
- Experiencia menos intuitiva y más frustrante

---

## 5️⃣ PRINCIPIO 5: Prevención de Errores

### **CASO DE PRUEBA 5.1: Validación en Tiempo Real del Formulario de Registro**

**Descripción del principio:**
Es mejor prevenir que un error ocurra en primer lugar, mediante un diseño cuidadoso que elimine condiciones propensas a errores o que verifique y presente una opción de confirmación antes de comprometerse con la acción.

**Escenario de aplicación:**
Cuando una nueva usuaria se registra en la plataforma, el formulario debe validar cada campo en tiempo real (mientras escribe) para prevenir errores antes de enviar el formulario, evitando la frustración de recibir múltiples mensajes de error al final.

**Elementos del diseño que aplican este principio:**
- **Validación inline**: Mensaje inmediato bajo cada campo al perder el foco
- **Indicadores visuales**: Borde rojo para error, verde para correcto
- **Mensajes específicos**: "El email ya está registrado" en lugar de "Error en email"
- **Requisitos visibles**: Lista de requisitos de contraseña con checks verdes
- **Formato automático**: Teléfono se formatea automáticamente (300-123-4567)
- **Sugerencias proactivas**: "¿Quisiste decir @gmail.com?" para emails
- **Deshabilitación inteligente**: Botón "Registrar" deshabilitado hasta que todo sea válido

**Cómo beneficia la experiencia del usuario:**
- Evita la frustración de errores al enviar
- Proporciona guía educativa sobre requisitos
- Reduce el tiempo total de registro
- Aumenta la tasa de completación exitosa
- Crea una primera impresión positiva de la plataforma

**Posibles consecuencias de no aplicarlo:**
- Múltiples intentos fallidos de registro
- Frustración y abandono del proceso
- Pérdida de usuarias potenciales en el primer paso
- Aumento de tickets de soporte
- Percepción de plataforma deficiente o complicada

---

### **CASO DE PRUEBA 5.2: Confirmación de Monto en Solicitud de Préstamo**

**Descripción del principio:**
Para acciones críticas o irreversibles, el sistema debe solicitar confirmación explícita y mostrar claramente las consecuencias de la acción.

**Escenario de aplicación:**
Cuando una beneficiaria está por enviar una solicitud de préstamo de $2,000,000 COP a 24 meses, el sistema debe mostrar un resumen claro con todos los detalles financieros y solicitar confirmación explícita antes de procesar la solicitud.

**Elementos del diseño que aplican este principio:**
- **Modal de confirmación**: Ventana emergente con resumen completo
- **Desglose financiero claro**:
  - Monto solicitado: $2,000,000
  - Interés mensual: 2.5%
  - Cuota mensual: $95,833
  - Total a pagar: $2,300,000
  - Plazo: 24 meses
- **Checkbox de confirmación**: "He leído y acepto los términos del préstamo"
- **Advertencias visibles**: "Esta solicitud no se puede cancelar una vez enviada"
- **Botones claros**: "Confirmar Solicitud" (verde) vs "Revisar Datos" (gris)
- **Cálculo en tiempo real**: Actualización automática al cambiar monto o plazo

**Cómo beneficia la experiencia del usuario:**
- Previene solicitudes accidentales o mal informadas
- Asegura comprensión total del compromiso financiero
- Reduce arrepentimientos posteriores
- Aumenta la confianza en la decisión tomada
- Protege a las usuarias de decisiones apresuradas

**Posibles consecuencias de no aplicarlo:**
- Solicitudes de préstamos no deseados o mal calculados
- Sorpresas desagradables con las cuotas mensuales
- Aumento de solicitudes de cancelación
- Pérdida de confianza en la plataforma
- Posibles problemas legales por falta de transparencia

---

## 6️⃣ PRINCIPIO 6: Reconocimiento en Lugar de Recuerdo

### **CASO DE PRUEBA 6.1: Historial de Cursos Visitados**

**Descripción del principio:**
Minimizar la carga de memoria del usuario haciendo visibles objetos, acciones y opciones. El usuario no debería tener que recordar información de una parte del diálogo a otra.

**Escenario de aplicación:**
Cuando una beneficiaria está explorando el catálogo de cursos y visita varios cursos para compararlos, el sistema debe mostrar claramente cuáles cursos ya visitó, cuáles tiene en progreso, y cuáles ya completó, sin que tenga que recordarlo.

**Elementos del diseño que aplican este principio:**
- **Badges visuales**: "Visitado", "En progreso 45%", "Completado ✓"
- **Cambio de color**: Cursos visitados en tono más claro o con borde diferente
- **Sección "Continuar viendo"**: Cursos iniciados aparecen en el dashboard
- **Barra de progreso visible**: En cada tarjeta de curso muestra el % avanzado
- **Filtros inteligentes**: "Mis cursos", "Completados", "Disponibles"
- **Breadcrumbs**: Rastro de navegación "Inicio > Cursos > Emprendimiento"
- **Última fecha de acceso**: "Último acceso: hace 2 días"

**Cómo beneficia la experiencia del usuario:**
- Elimina la necesidad de recordar qué cursos ya vio
- Facilita retomar cursos donde los dejó
- Permite comparar cursos sin perder el rastro
- Reduce la carga cognitiva durante la exploración
- Aumenta la probabilidad de completar cursos iniciados

**Posibles consecuencias de no aplicarlo:**
- La usuaria revisaría cursos repetidamente sin recordarlo
- Perdería tiempo buscando dónde quedó en un curso
- Frustración al no encontrar cursos iniciados
- Menor tasa de completación de cursos
- Sensación de desorganización y caos

---

### **CASO DE PRUEBA 6.2: Autocompletado en Formulario de Perfil**

**Descripción del principio:**
El sistema debe recordar información previamente ingresada y ofrecerla como sugerencia para evitar que el usuario tenga que recordarla o reescribirla.

**Escenario de aplicación:**
Cuando una beneficiaria actualiza su perfil o llena un formulario de solicitud, el sistema debe autocompletar campos con información que ya tiene almacenada (nombre, dirección, teléfono) y ofrecer sugerencias basadas en entradas anteriores.

**Elementos del diseño que aplican este principio:**
- **Campos pre-llenados**: Información existente ya visible en el formulario
- **Autocompletado de dirección**: Sugerencias al escribir las primeras letras
- **Dropdown de opciones previas**: Lista de direcciones usadas anteriormente
- **Guardado automático**: Información se guarda sin necesidad de hacer clic
- **Sugerencias inteligentes**: "¿Es la misma dirección de tu negocio?"
- **Formato recordado**: El sistema recuerda preferencias de formato
- **Datos persistentes**: Información permanece aunque cierre sesión

**Cómo beneficia la experiencia del usuario:**
- Ahorra tiempo al no tener que reescribir información
- Reduce errores de escritura en datos importantes
- Hace el proceso más fluido y rápido
- Demuestra que el sistema "conoce" a la usuaria
- Aumenta la eficiencia en tareas repetitivas

**Posibles consecuencias de no aplicarlo:**
- Frustración por tener que reescribir la misma información
- Aumento de errores tipográficos
- Mayor tiempo para completar formularios
- Percepción de sistema poco inteligente
- Abandono de procesos por tedio

---

## 7️⃣ PRINCIPIO 7: Flexibilidad y Eficiencia de Uso

### **CASO DE PRUEBA 7.1: Atajos de Teclado para Navegación Rápida**

**Descripción del principio:**
Los aceleradores, invisibles para usuarios novatos, pueden acelerar la interacción para usuarios expertos, permitiendo que el sistema atienda tanto a usuarios inexpertos como experimentados.

**Escenario de aplicación:**
Una beneficiaria que usa la plataforma frecuentemente (usuaria experta) debe poder navegar rápidamente entre secciones usando atajos de teclado, mientras que una usuaria nueva puede seguir usando el mouse y menús visuales.

**Elementos del diseño que aplican este principio:**
- **Atajos de teclado**:
  - `Alt + D`: Ir al Dashboard
  - `Alt + C`: Ir a Cursos
  - `Alt + P`: Ir a Préstamos
  - `Alt + M`: Ir a Mi Perfil
  - `Ctrl + K`: Búsqueda rápida
  - `Esc`: Cerrar modal/diálogo
- **Tooltips informativos**: Muestran el atajo al hacer hover sobre botones
- **Búsqueda global**: Barra de búsqueda rápida (Ctrl+K) para encontrar cualquier cosa
- **Acciones rápidas**: Menú contextual con clic derecho
- **Navegación con Tab**: Orden lógico de tabulación entre campos
- **Guía de atajos**: Sección de ayuda con lista completa de shortcuts

**Cómo beneficia la experiencia del usuario:**
- Aumenta dramáticamente la velocidad para usuarias frecuentes
- Permite uso sin mouse (accesibilidad)
- Reduce clics y movimientos innecesarios
- Crea sensación de dominio y expertise
- No interfiere con usuarias que prefieren el mouse

**Posibles consecuencias de no aplicarlo:**
- Usuarias expertas se frustran por lentitud
- Mayor tiempo para completar tareas rutinarias
- Menor productividad para usuarias frecuentes
- Plataforma menos accesible para personas con discapacidades motoras
- Percepción de herramienta básica o poco profesional

---

### **CASO DE PRUEBA 7.2: Filtros Avanzados y Guardado de Preferencias**

**Descripción del principio:**
Permitir a los usuarios personalizar acciones frecuentes y guardar sus preferencias para hacer el sistema más eficiente según sus necesidades específicas.

**Escenario de aplicación:**
Cuando una beneficiaria busca cursos, debe poder aplicar múltiples filtros (categoría, nivel, duración, certificación) y el sistema debe recordar sus preferencias para futuras búsquedas, mostrando primero los cursos más relevantes para ella.

**Elementos del diseño que aplican este principio:**
- **Panel de filtros avanzados**:
  - Categoría (emprendimiento, finanzas, costura, etc.)
  - Nivel (básico, intermedio, avanzado)
  - Duración (< 10h, 10-20h, > 20h)
  - Tipo (gratuito, pago)
  - Certificación (sí/no)
- **Guardado de filtros**: "Guardar esta búsqueda" para reutilizar
- **Ordenamiento personalizable**: Por popularidad, fecha, duración, alfabético
- **Vista personalizada**: Lista, cuadrícula, compacta
- **Preferencias recordadas**: El sistema aplica automáticamente filtros previos
- **Recomendaciones personalizadas**: Basadas en cursos vistos y completados

**Cómo beneficia la experiencia del usuario:**
- Encuentra cursos relevantes más rápidamente
- No tiene que reconfigurar filtros cada vez
- Experiencia personalizada según sus intereses
- Ahorra tiempo en búsquedas repetitivas
- Descubre contenido más relevante para ella

**Posibles consecuencias de no aplicarlo:**
- Pérdida de tiempo aplicando los mismos filtros repetidamente
- Frustración al ver cursos irrelevantes
- Menor descubrimiento de cursos apropiados
- Abandono de la búsqueda por tedio
- Menor engagement con el catálogo de cursos

---

## 8️⃣ PRINCIPIO 8: Diseño Estético y Minimalista

### **CASO DE PRUEBA 8.1: Dashboard Limpio con Información Priorizada**

**Descripción del principio:**
Los diálogos no deben contener información irrelevante o raramente necesaria. Cada unidad adicional de información compite con las unidades relevantes y disminuye su visibilidad relativa.

**Escenario de aplicación:**
Cuando una beneficiaria accede a su dashboard principal, debe ver solo la información más importante y relevante para su situación actual, sin elementos visuales que distraigan o información secundaria que sature la pantalla.

**Elementos del diseño que aplican este principio:**
- **Jerarquía visual clara**:
  - **Nivel 1**: Alertas urgentes (pagos vencidos, cursos por expirar)
  - **Nivel 2**: Acciones principales (explorar cursos, solicitar préstamo)
  - **Nivel 3**: Progreso actual (cursos en progreso, préstamos activos)
  - **Nivel 4**: Estadísticas generales (cursos completados, monto total)
- **Espaciado generoso**: White space entre secciones para respirar
- **Máximo 3-4 tarjetas principales**: No saturar con demasiada información
- **Iconografía simple**: Iconos minimalistas sin decoración excesiva
- **Paleta de colores limitada**: Rosa, púrpura, gris, con acentos estratégicos
- **Tipografía clara**: Máximo 2 fuentes, jerarquía de tamaños obvia
- **Información expandible**: Detalles adicionales en "Ver más" o modals

**Cómo beneficia la experiencia del usuario:**
- Reduce la sobrecarga cognitiva
- Facilita la toma de decisiones rápidas
- Mejora la comprensión de lo importante
- Crea una experiencia visual agradable y profesional
- Aumenta la velocidad de escaneo visual

**Posibles consecuencias de no aplicarlo:**
- Abrumación visual y parálisis por análisis
- Dificultad para encontrar información importante
- Fatiga visual y mental
- Percepción de plataforma complicada o amateur
- Abandono por sensación de caos

---

### **CASO DE PRUEBA 8.2: Formulario de Préstamo con Pasos Separados**

**Descripción del principio:**
Dividir procesos complejos en pasos simples y mostrar solo la información necesaria en cada momento, evitando formularios largos y abrumadores.

**Escenario de aplicación:**
Cuando una beneficiaria solicita un microcrédito, en lugar de mostrar un formulario largo con 15 campos, el proceso se divide en 4 pasos claros, mostrando solo 3-4 campos por pantalla.

**Elementos del diseño que aplican este principio:**
- **Paso 1 - Información básica**: Monto, propósito (2 campos)
- **Paso 2 - Detalles del préstamo**: Plazo, fecha de inicio (2 campos)
- **Paso 3 - Información personal**: Verificación de datos (3 campos)
- **Paso 4 - Confirmación**: Resumen y aceptación de términos
- **Indicador de progreso**: "Paso 2 de 4" con barra visual
- **Un foco por pantalla**: Solo una pregunta principal por paso
- **Navegación clara**: Botones "Anterior" y "Siguiente" siempre visibles
- **Guardado automático**: Progreso se guarda entre pasos
- **Diseño limpio**: Mucho espacio en blanco, sin distracciones

**Cómo beneficia la experiencia del usuario:**
- Reduce la intimidación de formularios largos
- Aumenta la tasa de completación
- Facilita la concentración en cada pregunta
- Permite pausar y continuar después
- Crea sensación de progreso y logro

**Posibles consecuencias de no aplicarlo:**
- Abandono del formulario por abrumación
- Errores por llenar campos apresuradamente
- Frustración y ansiedad
- Menor tasa de solicitudes completadas
- Percepción de proceso complicado

---

## 9️⃣ PRINCIPIO 9: Ayuda a los Usuarios a Reconocer, Diagnosticar y Recuperarse de Errores

### **CASO DE PRUEBA 9.1: Mensajes de Error Claros en Login Fallido**

**Descripción del principio:**
Los mensajes de error deben expresarse en lenguaje sencillo (sin códigos), indicar con precisión el problema y sugerir constructivamente una solución.

**Escenario de aplicación:**
Cuando una beneficiaria intenta iniciar sesión pero ingresa credenciales incorrectas, el sistema debe mostrar un mensaje de error claro que explique exactamente qué salió mal y qué puede hacer para solucionarlo.

**Elementos del diseño que aplican este principio:**
- **Mensaje específico y humano**:
  - ❌ MAL: "Error 401: Unauthorized"
  - ✅ BIEN: "El email o la contraseña son incorrectos. Por favor, verifica e intenta nuevamente."
- **Iconografía clara**: Icono de alerta (⚠️) en color naranja o rojo
- **Sugerencias constructivas**:
  - "¿Olvidaste tu contraseña? Recupérala aquí"
  - "¿Es tu primera vez? Regístrate aquí"
- **Indicación visual del campo**: El campo con error se resalta en rojo
- **Posibles causas**: "Verifica que no tengas Bloq Mayús activado"
- **Acción clara**: Botón "Recuperar contraseña" visible
- **Sin jerga técnica**: Lenguaje comprensible para cualquier persona

**Cómo beneficia la experiencia del usuario:**
- Reduce la frustración al entender qué salió mal
- Proporciona un camino claro para resolver el problema
- Evita múltiples intentos fallidos
- Mantiene la confianza en la plataforma
- Empodera a la usuaria para auto-resolver el problema

**Posibles consecuencias de no aplicarlo:**
- Confusión sobre qué causó el error
- Múltiples intentos fallidos sin dirección
- Necesidad de contactar soporte innecesariamente
- Frustración y abandono del login
- Percepción de plataforma poco amigable

---

### **CASO DE PRUEBA 9.2: Validación con Sugerencias en Formulario de Préstamo**

**Descripción del principio:**
Cuando el usuario comete un error, el sistema debe no solo indicarlo, sino también ofrecer sugerencias específicas para corregirlo.

**Escenario de aplicación:**
Cuando una beneficiaria intenta solicitar un préstamo de $50,000 COP (por debajo del mínimo de $100,000) o de $10,000,000 (por encima del máximo de $5,000,000), el sistema debe explicar claramente los límites y sugerir montos apropiados.

**Elementos del diseño que aplican este principio:**
- **Mensaje de error constructivo**:
  - "El monto mínimo es $100,000 COP. Te sugerimos solicitar al menos $100,000 para cubrir los costos de tu emprendimiento."
  - "El monto máximo es $5,000,000 COP. Si necesitas más, considera solicitar un préstamo adicional después de pagar el 50% del primero."
- **Sugerencias visuales**: Slider que muestra el rango válido ($100k - $5M)
- **Ejemplos útiles**: "Montos populares: $500,000, $1,000,000, $2,000,000"
- **Cálculo automático**: "Con $100,000 tu cuota mensual sería de $9,583"
- **Contexto educativo**: "El 80% de las beneficiarias solicitan entre $500k y $2M"
- **Alternativas**: "¿Necesitas menos? Conoce nuestro programa de microahorros"
- **Formato correcto**: Muestra el formato esperado "$1,000,000" vs "1000000"

**Cómo beneficia la experiencia del usuario:**
- Transforma el error en una oportunidad de aprendizaje
- Proporciona contexto para tomar mejores decisiones
- Reduce intentos fallidos
- Aumenta la probabilidad de solicitud exitosa
- Crea una experiencia educativa y empoderadora

**Posibles consecuencias de no aplicarlo:**
- Frustración por no entender los límites
- Múltiples intentos fallidos sin guía
- Abandono del proceso de solicitud
- Percepción de requisitos arbitrarios o injustos
- Pérdida de oportunidad de educar financieramente

---

## 🔟 PRINCIPIO 10: Ayuda y Documentación

### **CASO DE PRUEBA 10.1: Tooltips Contextuales en Formularios Complejos**

**Descripción del principio:**
Aunque es mejor que el sistema pueda usarse sin documentación, puede ser necesario proporcionar ayuda. Esta información debe ser fácil de buscar, enfocada en la tarea del usuario, listar pasos concretos y no ser demasiado extensa.

**Escenario de aplicación:**
Cuando una beneficiaria está llenando el formulario de solicitud de préstamo y encuentra términos o campos que no entiende completamente (como "tasa de interés" o "plazo"), debe poder acceder a ayuda contextual sin salir del formulario.

**Elementos del diseño que aplican este principio:**
- **Iconos de ayuda (?)**: Junto a cada término técnico o campo complejo
- **Tooltips al hover**: Explicaciones breves (2-3 líneas) al pasar el mouse
- **Ejemplos concretos**: "Ejemplo: Para un préstamo de $1M a 12 meses, pagarás $95,833 mensuales"
- **Videos cortos**: Links a videos de 30-60 segundos explicando conceptos
- **Chat de ayuda**: Botón flotante para preguntas en tiempo real
- **Sección "¿Cómo funciona?"**: Expandible con información detallada
- **Glosario integrado**: Definiciones de términos financieros en lenguaje simple
- **Casos de éxito**: "María solicitó $500k para su negocio de costura y lo pagó en 18 meses"

**Cómo beneficia la experiencia del usuario:**
- Proporciona ayuda justo cuando se necesita
- No interrumpe el flujo de trabajo
- Educa sin abrumar
- Aumenta la confianza para completar el formulario
- Reduce dependencia de soporte externo

**Posibles consecuencias de no aplicarlo:**
- Abandono del formulario por confusión
- Errores por no entender los campos
- Aumento de tickets de soporte
- Solicitudes incorrectas o mal informadas
- Exclusión de usuarias con menor educación financiera

---

### **CASO DE PRUEBA 10.2: Centro de Ayuda con Búsqueda Inteligente**

**Descripción del principio:**
La documentación de ayuda debe ser fácilmente accesible, buscable y organizada según las tareas que los usuarios realmente necesitan realizar.

**Escenario de aplicación:**
Cuando una beneficiaria tiene dudas sobre cómo usar la plataforma (por ejemplo, "¿Cómo me inscribo en un curso?" o "¿Cuándo debo pagar mi préstamo?"), debe poder encontrar respuestas rápidamente a través de un centro de ayuda bien organizado.

**Elementos del diseño que aplican este principio:**
- **Barra de búsqueda prominente**: "¿En qué podemos ayudarte?" en la parte superior
- **Categorías claras**:
  - 📚 Cursos y Certificaciones
  - 💰 Préstamos y Pagos
  - 👤 Mi Cuenta y Perfil
  - 🔒 Seguridad y Privacidad
- **Preguntas frecuentes (FAQ)**: Las 10 preguntas más comunes visibles
- **Tutoriales paso a paso**: Con capturas de pantalla y videos
- **Búsqueda inteligente**: Sugerencias mientras escribe
- **Artículos relacionados**: "Otros usuarios también consultaron..."
- **Feedback de utilidad**: "¿Te fue útil este artículo? Sí / No"
- **Contacto directo**: "¿No encontraste lo que buscabas? Contáctanos"
- **Guías descargables**: PDFs para consultar offline

**Cómo beneficia la experiencia del usuario:**
- Resolución rápida de dudas sin esperar soporte
- Aprendizaje autónomo a su propio ritmo
- Disponibilidad 24/7 de información
- Reduce frustración y bloqueos
- Empodera a la usuaria con conocimiento

**Posibles consecuencias de no aplicarlo:**
- Saturación del equipo de soporte
- Frustración por no poder resolver dudas simples
- Abandono de la plataforma por falta de guía
- Uso incorrecto de funcionalidades
- Percepción de plataforma poco profesional o incompleta

---

## 📊 Resumen de Casos de Prueba

| Principio | Casos | Elementos Clave |
|-----------|-------|-----------------|
| 1. Visibilidad del Estado | 2 | LoadingScreen, Indicadores de progreso |
| 2. Concordancia con el Mundo Real | 2 | Lenguaje simple, Organización natural |
| 3. Control y Libertad | 2 | Botones cancelar, Función deshacer |
| 4. Consistencia y Estándares | 2 | Botones uniformes, Iconos estándar |
| 5. Prevención de Errores | 2 | Validación en tiempo real, Confirmaciones |
| 6. Reconocimiento vs Recuerdo | 2 | Historial visible, Autocompletado |
| 7. Flexibilidad y Eficiencia | 2 | Atajos de teclado, Filtros guardados |
| 8. Diseño Minimalista | 2 | Dashboard limpio, Formularios por pasos |
| 9. Recuperación de Errores | 2 | Mensajes claros, Sugerencias constructivas |
| 10. Ayuda y Documentación | 2 | Tooltips contextuales, Centro de ayuda |
| **TOTAL** | **20** | **Cobertura completa de usabilidad** |

---

## ✅ Validación Funcional

Cada uno de estos 20 casos de prueba debe ser validado funcionalmente verificando:

1. **Presencia del elemento**: ¿Existe el componente descrito?
2. **Funcionalidad correcta**: ¿Funciona como se especifica?
3. **Usabilidad real**: ¿Mejora efectivamente la experiencia?
4. **Consistencia**: ¿Se aplica en todos los contextos relevantes?
5. **Accesibilidad**: ¿Es accesible para todos los usuarios?

---

**Documento generado para:** EmprenderFem - Plataforma de Emprendimientos Inclusivos  
**Fecha:** Octubre 2025  
**Propósito:** Entrega final de parcial - Principios de Nielsen
