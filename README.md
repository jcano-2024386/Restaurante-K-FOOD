# 🍽️ K-Food — Sistema de Gestión de Restaurantes

> Plataforma full-stack para la administración integral de restaurantes: sucursales, mesas, menús, categorías, pedidos, reservaciones y eventos. Desarrollada con arquitectura de microservicios y metodología SCRUM.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Metodología SCRUM](#-metodología-scrum)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Modelos de Datos](#-modelos-de-datos)
- [Roles del Sistema](#-roles-del-sistema)
- [Seguridad](#-seguridad)
- [Equipo](#-equipo)

---

## 📌 Descripción

**K-Food** es un sistema de gestión de restaurantes desarrollado como proyecto de Práctica Supervisada en el **Centro Educativo Técnico Laboral Kinal**. Permite administrar de forma centralizada:

- **Restaurantes y sucursales** con sus propios menús y personal
- **Mesas** con control de disponibilidad en tiempo real
- **Categorías y platillos** del menú con precios y disponibilidad
- **Pedidos** con flujo de estados y cálculo automático de totales
- **Reservaciones** de mesas por fecha, hora y número de personas
- **Eventos** con capacidad, precio de entrada y horarios
- **Estadísticas** generales del negocio
- **Control de roles**: ADMIN, GERENTE, MESERO y CLIENTE
- Microservicio de **autenticación dedicado** con verificación de email, JWT y recuperación de contraseña

---

## 🏗️ Arquitectura

K-Food utiliza una **arquitectura de microservicios** con responsabilidades claramente separadas:

```
K-Food/
├── 🔐 Auth Service (ASP.NET Core 8)
│   ├── Registro y Login con foto de perfil
│   ├── Verificación de email y recuperación de contraseña
│   ├── Generación y validación de JWT
│   ├── Gestión de roles
│   └── Historial de inicio de sesión por IP
│
├── 🍴 Restaurant API (Node.js + Express)
│   ├── Restaurantes y Sucursales
│   ├── Mesas (disponibilidad)
│   ├── Categorías y Menús
│   ├── Pedidos con flujo de estados
│   ├── Reservaciones
│   ├── Eventos
│   └── Estadísticas generales
│
└── 🖥️  Frontend (React + Vite)  [pendiente de integración]
```

El **Auth Service** implementa **Clean Architecture** en 4 capas desacopladas:

| Capa | Proyecto |
|---|---|
| API / Presentación | `AuthServiceRestaurante.Api` |
| Aplicación (lógica) | `AuthServiceRestaurante.Application` |
| Dominio (entidades) | `AuthServiceRestaurante.Domain` |
| Persistencia (datos) | `AuthServiceRestaurante.Persistence` |

---

## 🛠️ Tecnologías

### Restaurant API — Node.js
| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | ≥ 18 | Runtime |
| Express | ^5.2 | Framework HTTP |
| MongoDB + Mongoose | ^9.2 | Base de datos |
| JWT (jsonwebtoken) | ^9.0 | Autenticación |
| bcryptjs | ^2.4 | Hash de contraseñas |
| Helmet | ^8.1 | Seguridad de cabeceras HTTP |
| express-rate-limit | ^8.2 | Limitación de solicitudes |
| express-validator | ^7.3 | Validación de campos |
| Morgan | ^1.10 | Logging HTTP |

### Auth Service — ASP.NET Core
| Tecnología | Uso |
|---|---|
| ASP.NET Core 8 | Framework web |
| PostgreSQL 16 | Base de datos relacional |
| Entity Framework Core | ORM |
| JWT Bearer | Autenticación |
| Swagger / OpenAPI | Documentación interactiva |
| Cloudinary SDK | Imágenes de perfil |

### Frontend
| Tecnología | Uso |
|---|---|
| React | Interfaz de usuario |
| Axios | Cliente HTTP |
| Bootstrap / Tailwind CSS | Estilos y diseño responsivo |

### DevOps y Herramientas
| Herramienta | Uso |
|---|---|
| Docker | PostgreSQL en contenedor |
| GitHub | Control de versiones |
| Postman | Pruebas de API |
| Notion | Gestión de tareas |

---

## 📁 Estructura del Proyecto

```
Gestion-de-Restaurante/
├── configs/                        # Express, CORS, DB, Helmet
├── middlewares/                    # JWT, validadores, rate limit, errores
├── helpers/                        # Generador de JWT
├── utils/                          # Seed inicial de administrador
├── docs/
│   └── API.md                      # Documentación completa de endpoints
├── src/
│   ├── controllers/                # Lógica de negocio por módulo
│   │   ├── restaurantes.controllers.js
│   │   ├── sucursal.controller.js
│   │   ├── mesa.controller.js
│   │   ├── categoria.controller.js
│   │   ├── menu.controller.js
│   │   ├── pedido.controller.js
│   │   ├── reservacion.controller.js
│   │   ├── evento.controller.js
│   │   ├── estadisticas.controller.js
│   │   └── user.controller.js
│   ├── models/                     # Esquemas Mongoose
│   ├── routes/                     # Definición de rutas REST
│   ├── services/                   # Capa de servicios (restaurantes)
│   └── AuthServiceRestaurante.*    # Microservicio .NET (4 capas)
├── index.js                        # Entry point
└── .env                            # Variables de entorno
```

---

## 🔄 Metodología SCRUM

El proyecto se desarrolla en **4 sprints de 2 semanas** (duración total: 8 semanas):

| Sprint | Semanas | Objetivo | Tareas |
|---|---|---|---|
| **Sprint 1** | 1 – 2 | Configuración inicial, Auth Service, Login y JWT | 12 |
| **Sprint 2** | 3 – 4 | Gestión de restaurantes, menús y categorías con sus CRUDs | 15 |
| **Sprint 3** | 5 – 6 | CRUD completo y validaciones (mesas, pedidos, reservaciones) | 14 |
| **Sprint 4** | 7 – 8 | Gestión de eventos, estadísticas, pruebas finales y documentación | 10 |

### Roles SCRUM

| Rol | Integrante | Responsabilidades |
|---|---|---|
| **Scrum Master** | Jeferson Cano | Elimina impedimentos, facilita procesos, organiza reuniones, mejora continua |
| **Product Owner** | Otto Díaz | Define y prioriza el Product Backlog, visión del producto, comunicación efectiva |

### Burn Down Chart

El progreso se mide por:
- Número de tareas completadas vs. total por sprint
- Historias de usuario finalizadas
- Cumplimiento de objetivos por sprint

---

## ✅ Requisitos Previos

- **Node.js** ≥ 18 y **pnpm** ≥ 10
- **.NET SDK** 8.0
- **MongoDB** (local o MongoDB Atlas)
- **Docker** (para PostgreSQL del Auth Service)
- Cuenta en **Cloudinary** (imágenes de perfil de usuarios)

---


> ⚠️ **Nunca subas tu `.env` real al repositorio.** Agrégalo al `.gitignore`.

Para el Auth Service, configura `appsettings.json` con la cadena de conexión a PostgreSQL y los parámetros JWT.

### 🔐 Autenticación — `/auth`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/auth/register` | Registrar nuevo usuario | Público |
| `POST` | `/auth/login` | Iniciar sesión, retorna JWT | Público |
| `GET` | `/auth/profile` | Ver perfil propio | Todos ✅ |
| `GET` | `/auth/users` | Listar todos los usuarios | ADMIN ✅ |
| `PUT` | `/auth/users/:id` | Actualizar usuario | ADMIN / Dueño ✅ |
| `DELETE` | `/auth/users/:id` | Desactivar usuario | ADMIN ✅ |

---

### 🍽️ Restaurantes — `/restaurantes`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/` | Crear restaurante | ADMIN, GERENTE ✅ |
| `GET` | `/` | Listar restaurantes | Público |
| `GET` | `/:id` | Ver restaurante | Público |
| `PUT` | `/:id` | Actualizar restaurante | ADMIN, GERENTE ✅ |
| `DELETE` | `/:id` | Eliminar restaurante | ADMIN ✅ |

---

### 🏢 Sucursales — `/sucursales`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/` | Crear sucursal | ADMIN, GERENTE ✅ |
| `GET` | `/` | Listar sucursales | Público |
| `GET` | `/:id` | Ver sucursal | Público |
| `GET` | `/restaurante/:restauranteId` | Sucursales de un restaurante | Público |
| `PUT` | `/:id` | Actualizar sucursal | ADMIN, GERENTE ✅ |
| `DELETE` | `/:id` | Eliminar sucursal | ADMIN ✅ |

---

### 🪑 Mesas — `/mesas`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/` | Crear mesa | ADMIN, GERENTE ✅ |
| `GET` | `/` | Listar mesas | Público |
| `GET` | `/:id` | Ver mesa | Público |
| `GET` | `/sucursal/:sucursalId` | Mesas por sucursal (`?disponible=true\|false`) | Público |
| `PUT` | `/:id` | Actualizar mesa | ADMIN, GERENTE ✅ |
| `DELETE` | `/:id` | Eliminar mesa | ADMIN ✅ |

---

### 📂 Categorías — `/categorias`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/` | Crear categoría | ADMIN, GERENTE ✅ |
| `GET` | `/` | Listar categorías | Público |
| `GET` | `/:id` | Ver categoría | Público |
| `GET` | `/restaurante/:restauranteId` | Categorías por restaurante | Público |
| `PUT` | `/:id` | Actualizar categoría | ADMIN, GERENTE ✅ |
| `DELETE` | `/:id` | Eliminar categoría | ADMIN ✅ |

---

### 🍕 Menús — `/menus`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/` | Crear platillo | ADMIN, GERENTE ✅ |
| `GET` | `/` | Listar platillos | Público |
| `GET` | `/:id` | Ver platillo | Público |
| `GET` | `/restaurante/:restauranteId` | Menú por restaurante (`?disponible=true\|false`) | Público |
| `PUT` | `/:id` | Actualizar platillo | ADMIN, GERENTE ✅ |
| `DELETE` | `/:id` | Eliminar platillo | ADMIN ✅ |

---

### 🧾 Pedidos — `/pedidos`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/` | Crear pedido | ADMIN, GERENTE, MESERO ✅ |
| `GET` | `/` | Listar pedidos | ADMIN, GERENTE ✅ |
| `GET` | `/:id` | Ver pedido | Todos ✅ |
| `GET` | `/sucursal/:sucursalId` | Pedidos por sucursal | ADMIN, GERENTE, MESERO ✅ |
| `PUT` | `/:id/estado` | Cambiar estado del pedido | ADMIN, GERENTE, MESERO ✅ |

**Flujo de estados:** `PENDIENTE` → `EN_PROCESO` → `LISTO` → `ENTREGADO` / `CANCELADO`

---

### 📅 Reservaciones — `/reservaciones`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/` | Crear reservación | Todos ✅ |
| `GET` | `/` | Listar reservaciones | ADMIN, GERENTE ✅ |
| `GET` | `/mis-reservaciones` | Ver mis reservaciones | Todos ✅ |
| `GET` | `/:id` | Ver reservación | Todos ✅ |
| `PUT` | `/:id/estado` | Cambiar estado | ADMIN, GERENTE ✅ |
| `PUT` | `/:id/cancelar` | Cancelar reservación | Todos ✅ |

**Flujo de estados:** `PENDIENTE` → `CONFIRMADA` → `COMPLETADA` / `CANCELADA`

---

### 🎉 Eventos — `/eventos`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `POST` | `/` | Crear evento | ADMIN, GERENTE ✅ |
| `GET` | `/` | Listar eventos | Público |
| `GET` | `/:id` | Ver evento | Público |
| `GET` | `/sucursal/:sucursalId` | Eventos por sucursal | Público |
| `PUT` | `/:id` | Actualizar evento | ADMIN, GERENTE ✅ |
| `DELETE` | `/:id` | Cancelar evento | ADMIN ✅ |

**Flujo de estados:** `PROGRAMADO` → `EN_CURSO` → `FINALIZADO` / `CANCELADO`

---

### 📊 Estadísticas — `/estadisticas`

| Método | Endpoint | Descripción | Roles |
|---|---|---|---|
| `GET` | `/` | Resumen general del negocio | ADMIN, GERENTE ✅ |

---

### ❤️ Health Check

```
GET /GestorRestaurante/v1/health
```

---

## 🗄️ Modelos de Datos

### Pedido
| Campo | Tipo | Descripción |
|---|---|---|
| `mesa` | ObjectId | Mesa donde se sirve el pedido |
| `sucursal` | ObjectId | Sucursal del pedido |
| `mesero` | ObjectId | Usuario que atiende el pedido |
| `detalles` | Array | Platillos con cantidad, precio unitario y subtotal |
| `total` | Number | Total calculado automáticamente |
| `estado` | Enum | `PENDIENTE`, `EN_PROCESO`, `LISTO`, `ENTREGADO`, `CANCELADO` |
| `observaciones` | String | Notas especiales del cliente |

### Reservación
| Campo | Tipo | Descripción |
|---|---|---|
| `cliente` | ObjectId | Usuario que reserva |
| `mesa` | ObjectId | Mesa reservada |
| `sucursal` | ObjectId | Sucursal de la reserva |
| `fecha` | Date | Fecha de la reservación |
| `hora` | String | Hora en formato `HH:MM` |
| `numeroPersonas` | Number | Cantidad de personas |
| `estado` | Enum | `PENDIENTE`, `CONFIRMADA`, `COMPLETADA`, `CANCELADA` |

### Evento
| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | String | Nombre del evento |
| `fecha` | Date | Fecha del evento |
| `horaInicio / horaFin` | String | Horario en formato `HH:MM` |
| `capacidadMaxima` | Number | Máximo de asistentes |
| `precioEntrada` | Number | Precio de entrada (0 = gratuito) |
| `sucursal` | ObjectId | Sucursal donde se realiza |
| `estado` | Enum | `PROGRAMADO`, `EN_CURSO`, `FINALIZADO`, `CANCELADO` |

### Mesa
| Campo | Tipo | Descripción |
|---|---|---|
| `numero` | Number | Número de mesa (único por sucursal) |
| `capacidad` | Number | Cantidad de personas |
| `sucursal` | ObjectId | Sucursal a la que pertenece |
| `disponible` | Boolean | Disponibilidad en tiempo real |

---

## 👥 Roles del Sistema

| Rol | Descripción |
|---|---|
| **ADMIN** | Acceso total al sistema |
| **GERENTE** | Gestión de sucursales, menús, pedidos y eventos |
| **MESERO** | Crear y actualizar pedidos |
| **CLIENTE** | Hacer reservaciones y consultar el menú |

---

## 🔒 Seguridad

- Contraseñas hasheadas con **bcryptjs** (salt rounds: 10)
- Autenticación mediante **JWT** con expiración configurable (default: 30 min)
- **Verificación de email** en el Auth Service antes del primer acceso
- Cabeceras HTTP protegidas con **Helmet**
- **Rate Limiting** activo en todos los endpoints
- Validación estricta de campos con **express-validator**
- Índice único en mesas para evitar duplicados por sucursal
- **CORS** configurado explícitamente
- Middleware global de manejo de excepciones en el Auth Service
- **Historial de login** con registro de IP por sesión

---

## 👥 Equipo

| Integrante | Carné | Rol SCRUM | Área | Responsabilidades |
|---|---|---|---|---|
| **Jeferson André Cano López** | 2024386 | Scrum Master | Backend & Full Stack Support | Diseño de BD, Auth Service, API de pedidos y reservaciones, restaurantes, menús, gestión de mesas |
| **Otto Raúl Díaz Batres** | 2024248 | Product Owner | Frontend & Full Stack Support | Diseño UI en React, formularios y validaciones, conexión con APIs, eventos, estadísticas, pruebas |

---

## 📄 Información Académica

| Campo | Detalle |
|---|---|
| **Institución** | Centro Educativo Técnico Laboral Kinal |
| **Curso** | Práctica Supervisada |
| **Profesor** | Braulio Echeverría |
| **Fecha de Planificación** | 27 de febrero de 2026 |

---
