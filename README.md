# EcoCycle - Sustainable Scrap Management Platform

EcoCycle is a full-stack platform built with Next.js, Supabase, and Prisma that connects scrap sellers with local collectors in Sri Lanka.

## 🚀 Features

- **Live Map Integration**: Real-time Google Maps view of available scrap pick-ups.
- **Role-based Dashboards**: Custom interfaces for both Sellers and Collectors.
- **Premium Design**: Modern aesthetic with glassmorphism, custom mesh backgrounds, and responsive layouts.
- **Location Services**: Integrated GPS tracking and address auto-detection.
- **Real-time Updates**: Instant UI refreshes upon listing creation or job acceptance.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Auth**: Supabase Auth (SSR)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Maps**: @vis.gl/react-google-maps

---

## 🏃 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd scrapsync
```

### 2. Set up environment variables
Create a `.env` file from the provided template:
```bash
cp .env.example .env
```
_Note: If you are on Windows PowerShell, use:_
```powershell
copy .env.example .env
```

### 3. Install dependencies
```bash
npm install
```

### 4. Prisma Setup
Initialize your database client and sync your schema:
```bash
# Generate the Prisma Client
npx prisma generate

# Sync schema with database (if needed)
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Key Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode |
| `npx prisma generate` | Regenerates the Prisma Client after schema changes |
| `npx prisma studio` | Opens a GUI to view/edit your database data |
| `npx prisma db push` | Pushes your local schema changes to the live database |

---

## 📄 Environment Variable Reference

Ensure the following are set in your `.env`:

- `DATABASE_URL`: Supabase Connection Pooling URL.
- `DIRECT_URL`: Supabase Direct Connection URL (for migrations).
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous API key.
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`: Your Google Maps JavaScript API key.

---


