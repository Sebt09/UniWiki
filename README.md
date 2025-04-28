# 🌐 UniWiki - Centralización de Información Académica

**UniWiki** es un aplicativo web diseñado para centralizar, comparar y facilitar la búsqueda de programas académicos ofrecidos por universidades en la región de **Sabana Centro** (Colombia).

Los usuarios pueden buscar carreras como “Ingeniería de Sistemas” y encontrar:
- En qué universidades se oferta
- Modalidad, duración, ciudad, costo del semestre
- Perfil profesional, título otorgado y más

---

## 🚀 Tecnologías utilizadas

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js + Express + Prisma
- **Base de datos**: PostgreSQL (usando Docker)
- **ORM**: Prisma

---

## 📦 Clonación e instalación del proyecto

### 🔁 1. Clonar el repositorio

```bash
git clone URL
cd Uniwiki
```

### 🔁 2. Levantar PostgreSQL con Docker

docker run -d --name uniwiki-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=uniwiki -p 5432:5432 postgres


### 📂 3. Configurar el backend

```
cd backend
npm install
```
Asegúrate de que el archivo .env esté presente con esta línea:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/uniwiki"
```


Ejecuta migraciones:

```
npx prisma migrate dev --name init
```

Inicia el backend:

```
npm run dev
```

### 🌐 4. Configurar el frontend

```
cd ../frontend
npm install
npm run dev
```

