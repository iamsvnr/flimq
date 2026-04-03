-- FLIMQ Supabase Database Setup
-- Run this entire file in your Supabase SQL Editor

-- 1. User Profiles
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

-- 2. User Preferences
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  adult_enabled BOOLEAN DEFAULT false
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own prefs" ON user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own prefs" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prefs" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- 3. User Ratings
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

-- 4. Watch History
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

-- 5. User Reviews
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

-- 6. Watchlist
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

-- 7. Delete User Function
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

-- 8. Enable Real-Time
ALTER PUBLICATION supabase_realtime ADD TABLE user_ratings;
ALTER PUBLICATION supabase_realtime ADD TABLE user_reviews;
