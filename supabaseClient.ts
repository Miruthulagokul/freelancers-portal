// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kenuomarbetdwyxicizi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbnVvbWFyYmV0ZHd5eGljaXppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTk1OTksImV4cCI6MjA2MDI5NTU5OX0.VYPAKYuPiSQ-013EDqkWB8xfbPfcZ8SLVZ4jfnjJRao'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
