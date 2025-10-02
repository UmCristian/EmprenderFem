# 🔧 Problemas de Conexión y Soluciones
## EmprenderFem - Diagnóstico Técnico

---

## 🔴 **PROBLEMA 1: Navegación no funciona en el menú lateral**

### **Síntoma:**
Al hacer clic en "Dashboard", "Cursos" o "Préstamos" en el menú lateral, no navega a esas páginas.

### **Causa:**
Los botones del menú no tienen la función `onClick` con `navigate()`.

### **Archivo afectado:**
`frontend/src/components/Layout/Layout.jsx` (líneas 106-130)

### **Código actual (INCORRECTO):**
```jsx
<ListItemButton
  sx={{
    borderRadius: 2,
    '&:hover': {
      backgroundColor: 'primary.light',
      color: 'primary.contrastText',
    },
  }}
>
  <ListItemIcon sx={{ color: 'inherit' }}>
    {item.icon}
  </ListItemIcon>
  <ListItemText primary={item.text} />
</ListItemButton>
```

### **✅ SOLUCIÓN COMPLETA:**

```jsx
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // ✅ Agregar useNavigate y useLocation
// ... resto de imports

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();        // ✅ AGREGAR ESTO
  const location = useLocation();        // ✅ AGREGAR ESTO
  
  // ... resto del código
  
  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* ... */}
      
      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}  // ✅ AGREGAR onClick
                selected={location.pathname === item.path}  // ✅ AGREGAR selected
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                  },
                  '&.Mui-selected': {  // ✅ AGREGAR estilo para seleccionado
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
      
      {/* ... resto del código */}
    </Box>
  );
  
  // ... resto del componente
};
```

---

## 🔴 **PROBLEMA 2: Error de conexión con el backend GraphQL**

### **Síntoma:**
Errores de red al intentar hacer login o cargar datos. Console muestra: "Failed to fetch" o "Network error".

### **Causa:**
La URL del cliente Apollo está mal configurada (falta `/graphql` al final).

### **Archivo afectado:**
`frontend/src/apollo/client.js` (línea 5)

### **Código actual (INCORRECTO):**
```jsx
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',  // ❌ Falta /graphql
});
```

### **✅ SOLUCIÓN:**

```jsx
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',  // ✅ Agregar /graphql
});
```

### **Verificación:**
1. Asegúrate de que el backend esté corriendo en el puerto 4000
2. Abre en el navegador: `http://localhost:4000/graphql`
3. Deberías ver Apollo Studio (GraphQL Playground)

---

## 🔴 **PROBLEMA 3: Re-renders infinitos en AuthContext**

### **Síntoma:**
La aplicación se congela o tiene lag extremo. Console muestra warnings de "Maximum update depth exceeded".

### **Causa:**
Las funciones `login`, `logout`, `updateUser` se recrean en cada render, causando que `useMemo` se ejecute infinitamente.

### **Archivo afectado:**
`frontend/src/contexts/AuthContext.jsx` (líneas 47-76)

### **Código actual (INCORRECTO):**
```jsx
const login = (token, userData) => {  // ❌ Se recrea en cada render
  localStorage.setItem('token', token);
  setToken(token);
  setUser(userData);
};

const logout = () => {  // ❌ Se recrea en cada render
  localStorage.removeItem('token');
  setToken(null);
  setUser(null);
  client.clearStore();
};

const updateUser = (userData) => {  // ❌ Se recrea en cada render
  setUser(userData);
};

const value = useMemo(() => ({
  user,
  token,
  loading,
  login,      // ❌ Causa dependencia circular
  logout,     // ❌ Causa dependencia circular
  updateUser, // ❌ Causa dependencia circular
  isAuthenticated: !!user,
}), [user, token, loading, login, logout, updateUser]); // ❌ INCORRECTO
```

### **✅ SOLUCIÓN COMPLETA:**

```jsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
// ✅ Agregar useCallback
import PropTypes from 'prop-types';
import { useApolloClient } from '@apollo/client';
import { GET_ME } from '../apollo/queries';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const client = useApolloClient();

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const { data } = await client.query({
            query: GET_ME,
            errorPolicy: 'ignore'
          });
          if (data?.me) {
            setUser(data.me);
          } else {
            // Token inválido
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Error verificando autenticación:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token, client]);

  // ✅ Usar useCallback para memoizar las funciones
  const login = useCallback((newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    client.clearStore();
  }, [client]);

  const updateUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  // ✅ Ahora las funciones son estables y no causan re-renders
  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  }), [user, token, loading, login, logout, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
```

---

## 🔴 **PROBLEMA 4: Botones del Dashboard no navegan**

### **Síntoma:**
Los botones "Explorar Cursos" y "Solicitar Préstamo" en el Dashboard no hacen nada al hacer clic.

### **Archivo afectado:**
`frontend/src/pages/Dashboard/Dashboard.jsx` (líneas 254-260 y 333-339)

### **Código actual (INCORRECTO):**
```jsx
<Button
  variant="contained"
  sx={{ mt: 2 }}
  startIcon={<ArrowForward />}
>
  Explorar Cursos
</Button>
```

### **✅ SOLUCIÓN:**

```jsx
import { useNavigate } from 'react-router-dom'; // ✅ Agregar import

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // ✅ Agregar hook
  
  // ... resto del código
  
  return (
    <Button
      variant="contained"
      sx={{ mt: 2 }}
      startIcon={<ArrowForward />}
      onClick={() => navigate('/courses')} // ✅ Agregar onClick
    >
      Explorar Cursos
    </Button>
    
    // Y para el botón de préstamos:
    <Button
      variant="contained"
      sx={{ mt: 2 }}
      startIcon={<ArrowForward />}
      onClick={() => navigate('/loans')} // ✅ Agregar onClick
    >
      Solicitar Préstamo
    </Button>
  );
};
```

---

## 🔴 **PROBLEMA 5: Menú de perfil no navega a perfil**

### **Síntoma:**
Al hacer clic en "Mi Perfil" en el menú desplegable del avatar, no navega a la página de perfil.

### **Archivo afectado:**
`frontend/src/components/Layout/Layout.jsx` (líneas 233-244)

### **✅ SOLUCIÓN:**

```jsx
<MenuItem onClick={() => {
  handleProfileMenuClose();
  navigate('/profile'); // ✅ Agregar navegación
}}>
  <ListItemIcon>
    <PersonIcon fontSize="small" />
  </ListItemIcon>
  Mi Perfil
</MenuItem>

<MenuItem onClick={() => {
  handleProfileMenuClose();
  navigate('/profile'); // ✅ O a una página de configuración
}}>
  <ListItemIcon>
    <SettingsIcon fontSize="small" />
  </ListItemIcon>
  Configuración
</MenuItem>
```

---

## ✅ **CHECKLIST DE VERIFICACIÓN**

Después de aplicar las correcciones, verifica:

### Backend:
- [ ] El servidor backend está corriendo en `http://localhost:4000`
- [ ] GraphQL Playground accesible en `http://localhost:4000/graphql`
- [ ] MongoDB está corriendo y conectado
- [ ] Datos de prueba cargados con `npm run seed`

### Frontend:
- [ ] URL de Apollo Client es `http://localhost:4000/graphql`
- [ ] Navegación del menú lateral funciona
- [ ] Botones del Dashboard navegan correctamente
- [ ] Login funciona y guarda el token
- [ ] No hay re-renders infinitos (verificar con React DevTools)
- [ ] Menú de perfil navega correctamente

### Pruebas:
1. **Login**: Usar `maria@ejemplo.com` / `password123`
2. **Navegación**: Hacer clic en cada ítem del menú
3. **Dashboard**: Verificar que los botones funcionan
4. **Cursos**: Inscribirse en un curso
5. **Perfil**: Editar información personal

---

## 🚀 **COMANDOS PARA PROBAR**

### Terminal 1 (Backend):
```bash
cd "c:\Users\David Rojas\OneDrive\Documentos\GitHub\EmprenderFem"
npm run dev:backend
```

### Terminal 2 (Frontend):
```bash
cd "c:\Users\David Rojas\OneDrive\Documentos\GitHub\EmprenderFem\frontend"
npm run dev
```

### Verificar:
- Backend: `http://localhost:4000/graphql`
- Frontend: `http://localhost:3000`

---

## 📝 **RESUMEN DE ARCHIVOS A MODIFICAR**

1. ✅ `frontend/src/components/Layout/Layout.jsx`
   - Agregar `useNavigate` y `useLocation`
   - Agregar `onClick` a los botones del menú
   - Agregar navegación al menú de perfil

2. ✅ `frontend/src/apollo/client.js`
   - Cambiar URI a `http://localhost:4000/graphql`

3. ✅ `frontend/src/contexts/AuthContext.jsx`
   - Agregar `useCallback` a las funciones
   - Corregir dependencias de `useMemo`

4. ✅ `frontend/src/pages/Dashboard/Dashboard.jsx`
   - Agregar `useNavigate`
   - Agregar `onClick` a los botones

---

**Estado**: 🔴 Crítico - Requiere corrección inmediata
**Impacto**: Alto - Afecta navegación principal
**Tiempo estimado**: 30 minutos de correcciones
