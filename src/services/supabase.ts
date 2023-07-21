import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://vufwuomaggvbzodgaegz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1Znd1b21hZ2d2YnpvZGdhZWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyMDE1OTksImV4cCI6MjAwNDc3NzU5OX0.T41lBU6EC_gRUVd0WvbEjq-bMSn1uNiA87tlfsWtDEU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
