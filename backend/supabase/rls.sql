-- Phoenix Forge — Row Level Security
-- Run after schema.sql

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_certificates ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- user_lesson_progress
CREATE POLICY "progress_select_own" ON public.user_lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "progress_insert_own" ON public.user_lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- test_attempts
CREATE POLICY "attempts_select_own" ON public.test_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "attempts_insert_own" ON public.test_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- user_certificates
CREATE POLICY "certs_select_own" ON public.user_certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "certs_insert_own" ON public.user_certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read-only tables (no RLS needed — service role key bypasses anyway)
-- courses, lessons, tests, questions, question_options, certificates are public read
