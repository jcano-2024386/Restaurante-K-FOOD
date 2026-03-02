# 🍔 K-Food — Sistema de Gestión de Restaurante



**Kinal | Práctica Supervisada 2026 | Profesor: Braulio Echeverría**

| Integrante | Carné | Rol |
|---|---|---|
| Jeferson André Cano López | 2024386 | Scrum Master / Backend |
| Otto Raúl Díaz Batres | 2024248 | Product Owner / Frontend |

---

## 🛠️ Tecnologías

`Node.js` `Express.js` `MongoDB` `Mongoose` `JWT` `bcryptjs` `pnpm`

---

## 🚀 Instalación

```bash
git clone https://github.com/tu-usuario/k-food.git
cd k-food
pnpm install
cp .env.example .env   # configurar variables
node utils/seed-admin.js
pnpm dev
```

**Base URL:** `http://localhost:3006/GestorRestaurante/v1`

---

## ⚙️ Variables de Entorno

```env
PORT=3006
URI_MONGO=mongodb://localhost:27017/gestor_restaurante
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=30m
JWT_ISSUER=GestorRestaurante
JWT_AUDIENCE=GestorRestauranteApp
```

---

## 🔌 Endpoints

> Los endpoints protegidos requieren: `Authorization: Bearer <token>`

| Módulo | Ruta Base | Operaciones |
|---|---|---|
|  Auth | `/auth` | register, login, profile, users CRUD |
|  Restaurantes | `/restaurantes` | CRUD completo |
|  Sucursales | `/sucursales` | CRUD + filtro por restaurante |
|  Mesas | `/mesas` | CRUD + filtro por sucursal y disponibilidad |
|  Categorías | `/categorias` | CRUD + filtro por restaurante |
|  Menú | `/menus` | CRUD + filtro por restaurante |
|  Pedidos | `/pedidos` | Crear, listar, cambiar estado |
|  Reservaciones | `/reservaciones` | Crear, confirmar, cancelar |
|  Eventos | `/eventos` | CRUD + filtro por sucursal |
|  Estadísticas | `/estadisticas` | Resumen general e ingresos |

**Estados de Pedido:** `PENDIENTE` → `EN_PROCESO` → `LISTO` → `ENTREGADO` / `CANCELADO`  
**Estados de Reservación:** `PENDIENTE` → `CONFIRMADA` → `COMPLETADA` / `CANCELADA`

---

## 👤 Roles

| Rol | Acceso |
|---|---|
| `ADMIN` | Total |
| `GERENTE` | Menús, pedidos, sucursales, eventos, reservaciones |
| `MESERO` | Crear y actualizar pedidos |
| `CLIENTE` | Ver menú, hacer y cancelar reservaciones |

---

## 📅 Sprints SCRUM

| Sprint | Semanas | Objetivo |
|---|---|---|
| 1 | 1–2 | Auth, JWT, Roles |
| 2 | 3–4 | Restaurantes, Menús, Categorías |
| 3 | 5–6 | Sucursales, Mesas, Pedidos, Reservaciones |
| 4 | 7–8 | Eventos, Estadísticas, Documentación |

---

<div align="center">
  <sub>Centro Educativo Técnico Laboral Kinal · Guatemala 2026</sub>
</div>
