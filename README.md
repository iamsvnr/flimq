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

Run the following SQL in your Supabase **SQL Editor** (in order):

<details>
<summary>User Profiles</summary>

```sql
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  gender TEXT DEFAULT 'other',
  dob DATE DEFAULT '2000-01-01'
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
```
</details>

<details>
<summary>User Preferences</summary>

```sql
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  adult_enabled BOOLEAN DEFAULT false
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own prefs" ON user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own prefs" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prefs" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);
```
</details>

<details>
<summary>User Ratings</summary>

```sql
CREATE TABLE user_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tmdb_id INTEGER NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'tv')),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  author_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, tmdb_id, media_type)
);

ALTER TABLE user_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ratings are publicly readable" ON user_ratings FOR SELECT USING (true);
CREATE POLICY "Users can insert own ratings" ON user_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ratings" ON user_ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ratings" ON user_ratings FOR DELETE USING (auth.uid() = user_id);
```
</details>

<details>
<summary>Watch History</summary>

```sql
CREATE TABLE watch_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tmdb_id INTEGER NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'tv')),
  watched_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, tmdb_id, media_type)
);

ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own history" ON watch_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own history" ON watch_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own history" ON watch_history FOR DELETE USING (auth.uid() = user_id);
```
</details>

<details>
<summary>User Reviews</summary>

```sql
CREATE TABLE user_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tmdb_id INTEGER NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'tv')),
  content TEXT NOT NULL CHECK (char_length(content) >= 10 AND char_length(content) <= 2000),
  author_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (user_id, tmdb_id, media_type)
);

ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are publicly readable" ON user_reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON user_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON user_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON user_reviews FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_user_reviews_tmdb ON user_reviews (tmdb_id, media_type);
```
</details>

<details>
<summary>Watchlist</summary>

```sql
CREATE TABLE watchlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tmdb_id INTEGER NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'tv')),
  title TEXT,
  poster_path TEXT,
  vote_average NUMERIC,
  added_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, tmdb_id, media_type)
);

ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own watchlist" ON watchlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own watchlist" ON watchlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own watchlist" ON watchlist FOR DELETE USING (auth.uid() = user_id);
```
</details>

<details>
<summary>Delete User Function</summary>

```sql
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  DELETE FROM public.watchlist WHERE user_id = auth.uid();
  DELETE FROM public.user_ratings WHERE user_id = auth.uid();
  DELETE FROM public.watch_history WHERE user_id = auth.uid();
  DELETE FROM public.user_reviews WHERE user_id = auth.uid();
  DELETE FROM public.user_preferences WHERE user_id = auth.uid();
  DELETE FROM public.user_profiles WHERE user_id = auth.uid();
  DELETE FROM auth.users WHERE id = auth.uid();
$$;
```
</details>

<details>
<summary>Enable Real-Time</summary>

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE user_ratings;
ALTER PUBLICATION supabase_realtime ADD TABLE user_reviews;
```
</details>

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
