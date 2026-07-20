# Pokédex — Izam Assessment

A production-quality Pokédex single-page application built with React, Vite, and TypeScript, showcasing data-fetching patterns, routing, and modern UI practices.

---

## 📋 Project Overview

This project implements a feature-complete Pokédex app that allows users to browse all Pokémon, switch between two navigation modes (Pagination and Load More), and view detailed information for any individual Pokémon — including stats, abilities, height, weight, and base experience.

---

## ⚙️ Tech Stack

| Tool | Version | Purpose |
| :--- | :--- | :--- |
| **React** | 19 | UI component library |
| **TypeScript** | 6 | Static type safety |
| **Vite** | 8 | Build tool & dev server |
| **Tailwind CSS** | 4 | Utility-first styling (CSS-first config) |
| **React Router** | 8 | Client-side routing (`"react-router"`, not `"react-router-dom"`) |
| **TanStack Query** | 5 | Server-state management, caching, suspense integration |
| **react-error-boundary** | 6 | Declarative error handling |
| **Oxlint** | Latest | Fast Rust-based linter |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd izam-assessment

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the project root:

```env
VITE_API_URL=https://pokeapi.co/api/v2
```

> **Note:** `VITE_` prefix is required for Vite to expose environment variables to the client. The app falls back to `https://pokeapi.co/api/v2` if the variable is not set.

### Running the App

```bash
# Development server (with hot module replacement)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint the codebase
npm run lint
```

---

## ✅ Requirements Achieved

### Core Features
- **Pokémon List Page** — Displays Pokémon with name, ID, sprite, and type badge
- **Two view modes** selectable via a toggle:
  - **Pagination** — Classic page-by-page navigation with a sliding-window page number display
  - **Load More (Infinite Scroll)** — Appends Pokémon incrementally without re-mounting the grid
- **Pokémon Detail Page** — Full detail card showing:
  - Official artwork sprite
  - Types with color-coded badges
  - Base stats with animated progress bars
  - Abilities (with visual differentiation between regular and hidden)
  - Height, Weight, and Base Experience
- **URL-driven state** — The current page number is stored in the URL query string (`?page=2`) so the browser back button works correctly and pages can be bookmarked
- **Routing** — `/` for the list, `/pokemon/:id` for the detail page, and a 404 fallback
- **Error handling** — Every data boundary has an error fallback with a retry button, plus an app-level safety net for unexpected render errors
- **Loading states** — Skeleton screens replace spinners for a smoother perceived performance

### Code Quality
- Strict TypeScript throughout — no `any` leakage in public interfaces
- All API data is mapped into typed domain models before reaching any component
- Query keys are centralized in a single `queryKeys.ts` factory for consistency
- Components are small, focused, and reusable (9 shared components, 0 prop-drilling)

---

## 🌟 Bonus Features

- **Aggressive caching** — React Query is configured with `staleTime: 5min` and `gcTime: 30min`. Once a page or detail is loaded, navigating back to it is instant with zero network requests
- **De-duplication guard** — The Load More hook de-duplicates Pokémon by ID to protect against any out-of-order or duplicate API responses
- **Sprite CDN optimization** — Sprites are loaded from the PokeAPI GitHub CDN (`raw.githubusercontent.com`) instead of the API response URLs, avoiding an extra fetch per Pokémon on the list page
- **Tailwind CSS v4** — Uses the new CSS-first configuration with `@theme {}` blocks, the native Vite plugin (`@tailwindcss/vite`), and no `tailwind.config.js` or `postcss.config.js`
- **React Router v8** — Uses `"react-router"` directly (not `"react-router-dom"`), which is the modern unified import in v7+
- **Per-page gradient backgrounds** — Each page (List/Pagination, List/Load More, Detail) has a distinct pastel gradient to match the reference designs

---

## 🏗️ Project Structure

```
src/
├── api/
│   └── pokemon.ts          # All fetch calls + raw API → domain type mapping
├── types/
│   └── pokemon.ts          # Shared TypeScript interfaces
├── hooks/
│   ├── queryKeys.ts        # Centralized React Query key factory
│   ├── usePaginatedPokemon.ts
│   ├── useLoadMorePokemon.ts
│   └── usePokemonDetail.ts
├── components/
│   ├── QueryBoundary.tsx   # Suspense + ErrorBoundary composite
│   ├── PokemonCard.tsx
│   ├── PokemonGrid.tsx
│   ├── Pagination.tsx
│   ├── StatBar.tsx
│   ├── ViewToggle.tsx
│   ├── CardSkeleton.tsx
│   ├── ErrorFallback.tsx
│   └── AppErrorFallback.tsx
├── pages/
│   ├── list/
│   │   ├── ListPage.tsx         # URL state, view toggle, layout
│   │   ├── PaginatedListView.tsx
│   │   └── LoadMoreListView.tsx
│   └── detail/
│       ├── DetailPage.tsx       # Route shell, skeleton, back button
│       └── DetailContent.tsx    # Full Pokémon detail card
├── App.tsx                 # Route definitions
├── main.tsx               # App entry point with all providers
├── queryClient.ts         # React Query client configuration
└── index.css              # Tailwind v4 import + @theme custom tokens
```

---

## ❓ Why No Server Components?

Server Components (RSC) are a React architecture feature that requires a **server runtime** to render components on the server and stream them to the client. This project is a **pure client-side SPA built with Vite**, which only produces static HTML + JS bundles — there is no server process involved.

Implementing Server Components manually in a Vite/SPA setup would require building a custom Node.js server, a streaming renderer, a bundler split for server vs. client code, and serialization of server → client props — essentially re-implementing a significant portion of what frameworks like **Next.js**, **Remix**, or **TanStack Start** already provide.

> **If Server Components were a requirement**, the correct approach would be to adopt **Next.js** (App Router) or **Remix**, which provide Server Components, server-side data fetching, and streaming out of the box — rather than re-implementing this infrastructure manually in a Vite project.

For this assessment's scope (a client-side Pokédex with caching), **TanStack Query's `useSuspenseQuery`** provides equivalent benefits for client-rendered apps:
- Data is fetched as early as possible (on component mount)
- Results are cached and shared across the component tree
- Loading and error states are handled declaratively via `<Suspense>` and `<ErrorBoundary>`
