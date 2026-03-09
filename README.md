# 🍽️ K-Food — Sistema de Gestión de Restaurantes

> Plataforma web full-stack para la administración integral de restaurantes: sucursales, mesas, menús, pedidos, reservaciones y eventos, desarrollada con arquitectura de microservicios y metodología SCRUM.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Módulos del Sistema](#-módulos-del-sistema)
- [Metodología SCRUM](#-metodología-scrum)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Equipo](#-equipo)

---

## 📌 Descripción

**K-Food** es un sistema de gestión de restaurantes desarrollado como proyecto de Práctica Supervisada en el **Centro Educativo Técnico Laboral Kinal**. Permite administrar de forma centralizada múltiples restaurantes con sus sucursales, el personal de mesas, la carta de menús, la gestión de pedidos y reservaciones, así como la organización de eventos.

El sistema está orientado tanto a **administradores** como a **usuarios finales**, con un control de roles y permisos bien definido y una interfaz moderna construida en React.

---

## 🏗️ Arquitectura

K-Food utiliza una **arquitectura basada en microservicios**, con responsabilidades claras por área del sistema:

```
K-Food/
├── 🔐 Auth Service          → Autenticación, JWT, Roles y permisos
├── 🍴 Restaurant Service    → Restaurantes, Menús y Categorías
├── 📋 Order Service         → Pedidos y Reservaciones
├── 📅 Event Service         → Eventos y Mesas
└── 🖥️  Frontend             → React + Axios
```

Cada microservicio es independiente, lo que facilita la **escalabilidad**, el **mantenimiento** y la **seguridad** de la aplicación.

---

## 🛠️ Tecnologías

### Backend
| Tecnología | Uso |
|---|---|
| Node.js | Runtime del servidor |
| Express.js | Framework HTTP |
| MongoDB | Base de datos NoSQL |
| Mongoose | ODM para MongoDB |
| JWT | Autenticación y autorización |

### Frontend
| Tecnología | Uso |
|---|---|
| React | Librería de interfaz de usuario |
| Axios | Cliente HTTP para consumo de APIs |
| Bootstrap / Tailwind CSS | Estilos y diseño responsivo |

### DevOps y Herramientas
| Herramienta | Uso |
|---|---|
| GitHub | Control de versiones |
| Docker | Contenedores y despliegue |
| Postman | Pruebas de API |
| Notion | Gestión de tareas |
| Visual Studio Code | Editor de código |

---

## 📦 Módulos del Sistema

| Módulo | Descripción |
|---|---|
| 🏢 **Restaurantes** | CRUD completo de restaurantes y sucursales |
| 🍕 **Menús y Categorías** | Gestión de carta de menú por categorías |
| 🪑 **Mesas** | Administración de mesas por sucursal |
| 🛒 **Pedidos** | Creación y seguimiento de pedidos |
| 📅 **Reservaciones** | Sistema de reserva de mesas |
| 🎉 **Eventos** | Gestión de eventos especiales |
| 👤 **Usuarios y Roles** | Control de acceso con roles diferenciados |

---

## 🔄 Metodología SCRUM

El proyecto se desarrolla en **4 sprints de 2 semanas** cada uno:

| Sprint | Semanas | Objetivo | Tareas |
|---|---|---|---|
| **Sprint 1** | 1 – 2 | Configuración inicial, Auth Service, Login, JWT | 12 |
| **Sprint 2** | 3 – 4 | Gestión de restaurantes, menús, categorías y sus CRUDs | 15 |
| **Sprint 3** | 5 – 6 | CRUD completo, validaciones y gestión de registros | 14 |
| **Sprint 4** | 7 – 8 | Eventos, reservaciones, pruebas finales y documentación | 10 |

### Roles SCRUM

| Rol | Integrante | Responsabilidades |
|---|---|---|
| **Scrum Master** | Jeferson Cano | Elimina impedimentos, facilita procesos, organiza reuniones y vela por la mejora continua |
| **Product Owner** | Otto Díaz | Define y prioriza el Product Backlog, comunicación efectiva y visión del proyecto |

### Burn Down Chart

El progreso se mide por:
- Número de tareas completadas vs. total por sprint
- Historias de usuario finalizadas
- Cumplimiento de objetivos por sprint

---

## ✅ Requisitos Previos

- **Node.js** ≥ 18
- **npm** o **pnpm**
- **MongoDB** (local o Atlas)
- **Docker** (opcional, para despliegue de servicios)
- Cuenta de **GitHub** para control de versiones

---

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

> ⚠️ **Nunca subas tu archivo `.env` real al repositorio.** Asegúrate de tenerlo en tu `.gitignore`.

---

## 👥 Equipo

| Integrante | Carné | Rol SCRUM | Área | Responsabilidades |
|---|---|---|---|---|
| **Jeferson André Cano López** | 2024386 | Scrum Master | Backend & Full Stack Support | Diseño de BD, Auth Service, pedidos, JWT, restaurantes, menús, mesas, lógica de reservaciones |
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
