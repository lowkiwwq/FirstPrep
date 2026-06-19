-- Phoenix Forge — PostgreSQL schema (Railway)
-- Self-contained: no Supabase auth.users dependency, no RLS.
-- Run this first, then seed.sql.

CREATE EXTENSION IF NOT EXISTS pgcrypto;  -- for gen_random_uuid()

-- Identity table (replaces Supabase auth.users + profiles).
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  total_lessons INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lessons (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
  section_num INTEGER NOT NULL,
  lesson_num INTEGER NOT NULL,
  title TEXT NOT NULL,
  duration_sec INTEGER DEFAULT 0,
  type TEXT DEFAULT 'video',
  youtube_id TEXT,
  content_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tests (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  course_id INTEGER REFERENCES public.courses(id),
  time_limit_min INTEGER DEFAULT 20,
  max_attempts INTEGER DEFAULT 2,
  is_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.questions (
  id SERIAL PRIMARY KEY,
  test_id INTEGER REFERENCES public.tests(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  question_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.question_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES public.questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS public.test_attempts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  test_id INTEGER REFERENCES public.tests(id) ON DELETE CASCADE,
  score_pct NUMERIC(5, 2),
  passed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  attempt_num INTEGER DEFAULT 1,
  answers JSONB
);

CREATE TABLE IF NOT EXISTS public.certificates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  required_course_id INTEGER REFERENCES public.courses(id)
);

CREATE TABLE IF NOT EXISTS public.user_certificates (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  certificate_id INTEGER REFERENCES public.certificates(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, certificate_id)
);
