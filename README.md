# 🍳 Kitchenly — Recipe Discovery App

A recipe discovery app built with React, TypeScript, and [TheMealDB API](https://www.themealdb.com/). Browse recipes by category, search by name, view full recipe details, and save favorites — persisted to `localStorage`.

## Screenshots

| Home Page | Loading State | Recipe Detail |
| --- | --- | --- |
| ![Home Page ](/public/screenshots/homepage.png) | ![Loading state](/public/screenshots/loading-screen.png) | ![Favourite page](/public/screenshots/favourite-page.png) |

| Search Results |  Recipe Detail |
| --- | --- |
| ![Search results](/public/screenshots/search.png) | ![Recipe detail page](/public/screenshots/recipe-detail.png) |



> Screenshots live in `docs/screenshots/`. See [Capturing Screenshots](#capturing-screenshots) below if you need to regenerate them.

## Features

- Browse all recipe categories on the home page
- View all recipes within a category
- Search recipes by name from the navbar
- View full recipe details — ingredients, measurements, and instructions
- Add/remove recipes from favorites, persisted across sessions via `localStorage`
- Dedicated Favorites page with an empty state
- Loading and error states throughout
- Responsive, modern UI built with Tailwind CSS

## Tech Stack

- React + TypeScript
- React Router (`react-router-dom`)
- Tailwind CSS v4
- [TheMealDB API](https://www.themealdb.com/api.php) (no API key required)

## Project Structure

```
src/
├── components/
│   ├── CategoryCard.tsx      # Single category tile
│   ├── CategoryList.tsx      # Grid of category cards
│   ├── RecipeCard.tsx        # Single recipe tile with favorite toggle
│   ├── RecipeList.tsx        # Grid of recipe cards
│   ├── Navbar.tsx            # Top nav with search bar
│   ├── LoadingSpinner.tsx    # Shared loading indicator
│   └── ErrorMessage.tsx      # Shared error display
├── contexts/
│   ├── FavoritesContext.tsx  # Context definition + types
│   └── FavoritesProvider.tsx # Provider implementation (uses useLocalStorage)
├── hooks/
│   ├── useFetch.ts           # Generic data-fetching hook (data/loading/error)
│   ├── useLocalStorage.ts    # Syncs state with localStorage
│   └── useFavorites.ts       # Convenience hook to consume FavoritesContext
├── pages/
│   ├── HomePage.tsx          # "/" — all categories
│   ├── CategoryPage.tsx      # "/category/:categoryName" — recipes in a category
│   ├── RecipeDetailPage.tsx  # "/recipe/:recipeId" — full recipe detail
│   ├── FavoritesPage.tsx     # "/favorites" — saved recipes
│   ├── SearchPage.tsx        # "/search?query=" — search results
│   └── NotFound.tsx          # 404 fallback
├── types/
│   └── index.ts              # Shared TypeScript interfaces for API responses
├── App.tsx                   # Routes
└── main.tsx                  # Entry point, wraps App in FavoritesProvider
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Grid of all recipe categories |
| `/category/:categoryName` | All recipes in a given category |
| `/recipe/:recipeId` | Full detail view for a single recipe |
| `/favorites` | List of favorited recipes |
| `/search?query=<term>` | Search results for a recipe name |

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

Then open the local URL printed in your terminal (typically `http://localhost:5173`).

## Custom Hooks

- **`useFetch<T>(url)`** — generic fetch hook returning `{ data, loading, error }`. Re-fetches whenever `url` changes.
- **`useLocalStorage<T>(key, initialValue)`** — drop-in replacement for `useState` that persists to `localStorage`, used internally by `FavoritesProvider` to keep the favorites list across sessions.

## Favorites (Context API)

`FavoritesContext` exposes:
- `favoriteIds: string[]`
- `addFavorite(id: string): void`
- `removeFavorite(id: string): void`
- `isFavorite(id: string): boolean`

Consumed anywhere via the `useFavorites()` hook.

## Capturing Screenshots

To (re)generate the screenshots referenced above:

1. Run the app locally with `npm run dev`.
2. **Loading state** — open dev tools → Network tab → throttle to "Slow 3G", then reload the home page and screenshot before content appears.
3. **Home page** — screenshot `/` once categories have loaded.
4. **Search page** — search for a recipe (e.g. "chicken") and screenshot `/search?query=chicken`.
5. **Detail page** — click into any recipe and screenshot `/recipe/:id`.
6. Save each image into `docs/screenshots/` using the filenames referenced in this README: `loading.png`, `home.png`, `search.png`, `detail.png`.

## API Reference

This project uses the free, keyless TheMealDB endpoints:

- Categories: `GET /categories.php`
- Recipes by category: `GET /filter.php?c={category}`
- Recipe by ID: `GET /lookup.php?i={id}`
- Search by name: `GET /search.php?s={query}`

Base URL: `https://www.themealdb.com/api/json/v1/1/`