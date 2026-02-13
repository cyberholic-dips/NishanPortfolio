import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use a fallback to prevent the app from crashing at the top level
// but it will still fail gracefully when used if keys are invalid.
const url = supabaseUrl && supabaseUrl !== 'your_supabase_project_url' ? supabaseUrl : 'https://placeholder-project.supabase.co';
const key = supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key' ? supabaseAnonKey : 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url') {
    console.warn('Supabase credentials missing or using placeholders. Please check your .env file.');
}

export const supabase = createClient(url, key);
