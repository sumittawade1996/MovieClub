# Task: Movie Listing Web App

## Plan
- [x] Initialize project configuration
  - [x] Update `index.css` with dark theme variables
  - [x] Update `tailwind.config.js` for custom animations and tokens
- [x] Implement data management
  - [x] Create `src/types/movie.ts` for movie interfaces
  - [x] Create `src/hooks/use-movies.ts` for localStorage-based movie management
- [x] Implement UI Components
  - [x] Create `MovieCard` component
  - [x] Create `MovieGrid` component
  - [x] Create `Layout` component with navigation
- [x] Implement Public Pages
  - [x] Create `HomePage.tsx` for browsing movies
- [x] Implement Admin Panel
  - [x] Create `AdminLoginPage.tsx` with hardcoded credentials
  - [x] Create `AdminDashboardPage.tsx` with CRUD operations
- [x] Finalize Routing
  - [x] Update `src/routes.tsx`
  - [x] Update `src/App.tsx`
- [x] Validation and Polish
  - [x] Add initial sample movies using `image_search`
  - [x] Run lint and fix issues

## Notes
- Using `localStorage` as per explicit instruction "Supabase must not be used".
- Hardcoded admin credentials: `Sumit` / `Password Apsit@2026`.
- Theme: Black background, Netflix-style.
