import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dactaumlwvhctogkejul.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhY3RhdW1sd3ZoY3RvZ2tlanVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTY3MTcsImV4cCI6MjA4NzU3MjcxN30.o51Buo6DvJ2i-Qdybwp1DpGwadv-1OltoG0Ht2PXIPc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
