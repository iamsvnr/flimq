# FLIMQ

A modern movie & TV show discovery app built with React, inspired by Netflix, Hotstar & Prime Video.

## Features

- Browse trending, popular, top-rated & upcoming movies and TV shows
- Search across movies, TV shows & people
- Detailed movie & TV show pages with trailers, cast, seasons & episodes
- Person detail pages with filmography
- User authentication (email/password) with email verification
- Watchlist to save your favorites
- User ratings & reviews (visible to all users)
- Watch history tracking
- 18+ adult content toggle
- Social sharing (Twitter, WhatsApp, copy link)
- Keyboard shortcuts
- PWA support
- Fully responsive design

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4**
- **Supabase** (Auth, PostgreSQL, Row Level Security)
- **Framer Motion** for animations
- **Swiper.js** for carousels
- **TMDB API** for movie data

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/iamsvnr/flimq.git
cd flimq
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**How to get the keys:**

- **TMDB API Key**: Sign up at [themoviedb.org](https://www.themoviedb.org/settings/api) and create an API key (v3 auth)
- **Supabase URL & Anon Key**: Create a project at [supabase.com](https://supabase.com), go to **Settings → API** to find your Project URL and `anon` public key

### 3. Supabase Database Setup

Copy the contents of [`supabase/setup.sql`](supabase/setup.sql) and run it in your Supabase **SQL Editor**. This creates all required tables, RLS policies, the delete user function, and enables real-time.

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## Netlify Deployment

### Environment Variables

In Netlify, go to **Site settings → Environment variables** and add:

| Key | Value |
|-----|-------|
| `VITE_TMDB_API_KEY` | Your TMDB API key |
| `VITE_TMDB_BASE_URL` | `https://api.themoviedb.org/3` |
| `VITE_TMDB_IMAGE_BASE` | `https://image.tmdb.org/t/p` |
| `VITE_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `SUPABASE_URL` | Same as `VITE_SUPABASE_URL` (used by serverless functions) |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (**Settings → API → service_role**) |

### Build Settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `18` or higher |

### SPA Redirects

Create `public/_redirects` (if not present):

```
/*    /index.html   200
```

### Supabase Auth Redirect

In Supabase dashboard → **Authentication → URL Configuration**:

- **Site URL**: `https://your-site.netlify.app`
- **Redirect URLs**: `https://your-site.netlify.app/**`

Required for email confirmation and password reset links to work.
