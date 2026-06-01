// supabase_client.js
// Initialize Supabase Javascript SDK

// ⚠️ USER ACTION REQUIRED: Replace these placeholders with your actual Supabase URL and Anon Key
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let supabase = null;

if (SUPABASE_URL !== "YOUR_SUPABASE_URL") {
    // Only initialize if keys are provided
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.warn("Supabase not initialized: Please provide SUPABASE_URL and SUPABASE_ANON_KEY in js/supabase_client.js");
}

window.supabaseClient = supabase;
