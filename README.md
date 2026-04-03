# FLIMQ

A modern movie & TV show discovery app built with React, inspired by Netflix, Hotstar & Prime Video.

## Features

- Browse trending, popular, top-rated & upcoming movies and TV shows
- Search across movies, TV shows & people
- Detailed movie & TV show pages with trailers, cast, seasons & episodes
- Person detail pages with filmography
- Login / Sign Up authentication
- Watchlist to save your favorites
- Fully responsive design

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **Swiper.js** for carousels
- **TMDB API** for movie data
- **Netlify Functions** for API key protection

## Getting Started

```bash
git clone https://github.com/iamsvnr/flimq.git
cd flimq
npm install
```

Create a `.env` file:

```
TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

```bash
npm run dev
```

## Deployment

Deployed on **Netlify**. Add `TMDB_API_KEY` as an environment variable in your Netlify site settings (Site settings → Environment variables) — the serverless function at `/.netlify/functions/tmdb` proxies all TMDB requests so the key stays hidden from the browser.
