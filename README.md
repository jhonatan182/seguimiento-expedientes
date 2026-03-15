# Seguimiento de Expedientes - SEFIN

Sistema de seguimiento de expedientes desarrollado con Next.js 16, TypeScript y Turso DB para la gestión eficiente de expedientes en la Secretaría de Finanzas (SEFIN).

## 🚀 Stack Tecnológico

### Frontend

- **Next.js 16.1.4** - Framework de React con App Router
- **React 19.2.3** - Librería de UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Framework de CSS
- **shadcn/ui** - Componentes de UI reutilizables

### Backend & Base de Datos

- **Drizzle ORM** - ORM para base de datos
- **Turso (LibSQL)** - Base de datos SQLite serverless
- **NextAuth 5** - Autenticación y sesión

### Librerías Principales

- **React Hook Form + Zod** - Formularios y validación
- **TanStack Table** - Tablas interactivas
- **dnd-kit** - Drag and drop
- **Recharts** - Gráficos y visualizaciones
- **Sonner** - Notificaciones
- **Lucide React** - Iconos

## 📋 Requisitos Previos

- Node.js 18+
- Bun (recomendado para desarrollo)
- Cuenta en Turso para base de datos

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/jhonatan182/seguimiento-expedientes.git
cd seguimiento-expedientes
```

### 2. Instalar dependencias

```bash
bun install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Configurar las siguientes variables en `.env`:

```env
TURSO_DATABASE_URL=turso://...
TURSO_AUTH_TOKEN=...
```

### 4. Configurar base de datos

Ejecutar las migraciones de Drizzle:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

### 5. Poblar la base de datos (opcional)

```bash
bun run seed
```

## 🏁 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
bun run dev


# Construir para producción
bun run build


# Iniciar servidor de producción
bun run start

# Linter
bun run lint

# Poblar base de datos con datos de prueba
bun run seed
```

## 🏗️ Arquitectura

### Patrones de Diseño

- **Feature-First Architecture**: Código organizado por funcionalidades
- **Strategy Pattern**: Para manejo de cambios de estado de expedientes
- **Component-Driven Development**: Componentes reutilizables y tipados

### Flujo de Datos

1. **Componentes** → **Actions** → **Database**
2. **Server Actions** para mutaciones de datos
3. **React Query** para manejo de estado del cliente
4. **Drizzle ORM** para operaciones de base de datos

## 🔧 Cómo Agregar Nuevas Funcionalidades

### 1. Crear nueva feature

```bash
mkdir src/features/nueva-feature
cd src/features/nueva-feature
```

### 2. Estructura recomendada para una feature:

```
nueva-feature/
├── components/          # Componentes específicos de la feature
├── hooks/              # Hooks personalizados
├── types/              # Tipos específicos
├── utils/              # Utilidades de la feature
└── [feature-name]/     # Páginas de la feature (en app/)
```

### 3. Agregar nueva ruta en app/

Crear carpeta en `src/app/(main)/` o `src/app/(auth)/` según corresponda.

### 4. Para componentes UI compartidos

Agregar en `src/features/shared/components/ui/` usando shadcn/ui:

```bash
bunx shadcn@latest add button
```

## 🗄️ Esquema de Base de Datos

### Tablas Principales

- **PAM_ANALISTA**: Información de analistas
- **PAM_SEMANAS**: Configuración de semanas laborales
- **PAM_CABECERA_SEMANAL**: Cabeceras de control semanal
- **PAM_EXPEDIENTES**: Expedientes y su estado

### Migraciones

Las migraciones se generan automáticamente con Drizzle:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

## 🔐 Autenticación

El sistema utiliza NextAuth 5 con configuración personalizada. Los archivos de autenticación se encuentran en:

- `src/app/auth.config.ts`
- `src/features/auth/`

## 📊 Estados y Transiciones

El sistema implementa un patrón Strategy para manejar las transiciones de estado de los expedientes:

- **PENDIENTE** → **REQUERIDO**
- **REQUERIDO** → **COMPLETADO**
- etc.

Las estrategias se encuentran en `src/rdn/strategies/`.

## 🎨 Guía de Estilo

- **Tailwind CSS** para estilos
- **shadcn/ui** para componentes base
- **Lucide React** para iconos
- **CSS Variables** para temas personalizados

## 📝 Desarrollo

### Code Style

- TypeScript estricto
- ESLint para linting
- Componentes funcionales con hooks
- Server Actions para mutaciones

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Pull Request

---

**Desarrollado para la Secretaría Finanzas (SEFIN)**
