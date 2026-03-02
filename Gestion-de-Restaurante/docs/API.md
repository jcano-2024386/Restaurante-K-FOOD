# K-Food - API de Gestión de Restaurante

## Información General

- **Base URL:** `http://localhost:3006/GestorRestaurante/v1`
- **Autenticación:** JWT via header `Authorization: Bearer <token>` o `x-token: <token>`
- **Formato:** JSON

---

## Roles del Sistema

| Rol      | Descripción                              |
|----------|------------------------------------------|
| ADMIN    | Acceso total al sistema                  |
| GERENTE  | Gestión de sucursales, menús y pedidos   |
| MESERO   | Crear y actualizar pedidos               |
| CLIENTE  | Hacer reservaciones y ver menú           |

---

## Endpoints

### 🔐 Autenticación `/auth`

| Método | Ruta           | Descripción             | Roles      |
|--------|----------------|-------------------------|------------|
| POST   | /register      | Registrar usuario       | Público    |
| POST   | /login         | Iniciar sesión          | Público    |
| GET    | /profile       | Ver perfil propio       | Todos      |
| GET    | /users         | Listar usuarios         | ADMIN      |
| PUT    | /users/:id     | Actualizar usuario      | ADMIN/Dueño|
| DELETE | /users/:id     | Desactivar usuario      | ADMIN      |

### 🍽️ Restaurantes `/restaurantes`

| Método | Ruta  | Descripción              | Roles           |
|--------|-------|--------------------------|-----------------|
| POST   | /     | Crear restaurante        | ADMIN, GERENTE  |
| GET    | /     | Listar restaurantes      | Todos           |
| GET    | /:id  | Ver restaurante          | Todos           |
| PUT    | /:id  | Actualizar restaurante   | ADMIN, GERENTE  |
| DELETE | /:id  | Eliminar restaurante     | ADMIN           |

### 🏢 Sucursales `/sucursales`

| Método | Ruta                          | Descripción              | Roles          |
|--------|-------------------------------|--------------------------|----------------|
| POST   | /                             | Crear sucursal           | ADMIN, GERENTE |
| GET    | /                             | Listar sucursales        | Todos          |
| GET    | /:id                          | Ver sucursal             | Todos          |
| GET    | /restaurante/:restauranteId   | Sucursales por restaurante | Todos        |
| PUT    | /:id                          | Actualizar sucursal      | ADMIN, GERENTE |
| DELETE | /:id                          | Eliminar sucursal        | ADMIN          |

### 🪑 Mesas `/mesas`

| Método | Ruta                        | Descripción              | Roles          |
|--------|-----------------------------|--------------------------|----------------|
| POST   | /                           | Crear mesa               | ADMIN, GERENTE |
| GET    | /                           | Listar mesas             | Todos          |
| GET    | /:id                        | Ver mesa                 | Todos          |
| GET    | /sucursal/:sucursalId       | Mesas por sucursal       | Todos          |
| PUT    | /:id                        | Actualizar mesa          | ADMIN, GERENTE |
| DELETE | /:id                        | Eliminar mesa            | ADMIN          |

**Query params para GET /sucursal/:id:** `?disponible=true|false`

### 📂 Categorías `/categorias`

| Método | Ruta                          | Descripción              | Roles          |
|--------|-------------------------------|--------------------------|----------------|
| POST   | /                             | Crear categoría          | ADMIN, GERENTE |
| GET    | /                             | Listar categorías        | Todos          |
| GET    | /:id                          | Ver categoría            | Todos          |
| GET    | /restaurante/:restauranteId   | Categorías por restaurante | Todos        |
| PUT    | /:id                          | Actualizar categoría     | ADMIN, GERENTE |
| DELETE | /:id                          | Eliminar categoría       | ADMIN          |

### 🍕 Menús `/menus`

| Método | Ruta                          | Descripción              | Roles          |
|--------|-------------------------------|--------------------------|----------------|
| POST   | /                             | Crear platillo           | ADMIN, GERENTE |
| GET    | /                             | Listar platillos         | Todos          |
| GET    | /:id                          | Ver platillo             | Todos          |
| GET    | /restaurante/:restauranteId   | Menú por restaurante     | Todos          |
| PUT    | /:id                          | Actualizar platillo      | ADMIN, GERENTE |
| DELETE | /:id                          | Eliminar platillo        | ADMIN          |

**Query params para GET /restaurante/:id:** `?disponible=true|false`

### 🧾 Pedidos `/pedidos`

| Método | Ruta                      | Descripción              | Roles                     |
|--------|---------------------------|--------------------------|---------------------------|
| POST   | /                         | Crear pedido             | ADMIN, GERENTE, MESERO    |
| GET    | /                         | Listar pedidos           | ADMIN, GERENTE            |
| GET    | /:id                      | Ver pedido               | Todos                     |
| GET    | /sucursal/:sucursalId     | Pedidos por sucursal     | ADMIN, GERENTE, MESERO    |
| PUT    | /:id/estado               | Cambiar estado pedido    | ADMIN, GERENTE, MESERO    |

**Estados de pedido:** `PENDIENTE` → `EN_PROCESO` → `LISTO` → `ENTREGADO` / `CANCELADO`

**Ejemplo body crear pedido:**
```json
{
  "mesa": "id_mesa",
  "sucursal": "id_sucursal",
  "detalles": [
    { "menu": "id_platillo", "cantidad": 2 }
  ],
  "observaciones": "Sin cebolla"
}
```

### 📅 Reservaciones `/reservaciones`

| Método | Ruta                  | Descripción               | Roles          |
|--------|-----------------------|---------------------------|----------------|
| POST   | /                     | Crear reservación         | Todos          |
| GET    | /                     | Listar reservaciones      | ADMIN, GERENTE |
| GET    | /mis-reservaciones    | Mis reservaciones         | Todos          |
| GET    | /:id                  | Ver reservación           | Todos          |
| PUT    | /:id/estado           | Cambiar estado            | ADMIN, GERENTE |
| PUT    | /:id/cancelar         | Cancelar reservación      | Todos          |

**Estados de reservación:** `PENDIENTE` → `CONFIRMADA` → `COMPLETADA` / `CANCELADA`

**Formato hora:** `HH:MM` (ej. `19:30`)

### 🎉 Eventos `/eventos`

| Método | Ruta                      | Descripción              | Roles          |
|--------|---------------------------|--------------------------|----------------|
| POST   | /                         | Crear evento             | ADMIN, GERENTE |
| GET    | /                         | Listar eventos           | Todos          |
| GET    | /:id                      | Ver evento               | Todos          |
| GET    | /sucursal/:sucursalId     | Eventos por sucursal     | Todos          |
| PUT    | /:id                      | Actualizar evento        | ADMIN, GERENTE |
| DELETE | /:id                      | Cancelar evento          | ADMIN          |

**Estados de evento:** `PROGRAMADO` → `EN_CURSO` → `FINALIZADO` / `CANCELADO`

### 📊 Estadísticas `/estadisticas`

| Método | Ruta | Descripción              | Roles          |
|--------|------|--------------------------|----------------|
| GET    | /    | Resumen general          | ADMIN, GERENTE |

---

## Ejemplos de Uso

### 1. Login
```
POST /GestorRestaurante/v1/auth/login
Body: { "email": "admin@kfood.com", "password": "Admin1234" }
```

### 2. Crear un Restaurante
```
POST /GestorRestaurante/v1/restaurantes
Headers: Authorization: Bearer <token>
Body: { "nombre": "K-Food Central", "direccion": "Zona 10, Guatemala" }
```

### 3. Crear una Mesa
```
POST /GestorRestaurante/v1/mesas
Headers: Authorization: Bearer <token>
Body: { "numero": 1, "capacidad": 4, "sucursal": "<id_sucursal>" }
```

---

## Health Check

```
GET /GestorRestaurante/v1/health
```
