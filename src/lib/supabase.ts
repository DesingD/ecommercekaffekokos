import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eixapmtmoirkyuhhdevz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeGFwbXRtb2lya3l1aGhkZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjMxMDAsImV4cCI6MjA3MTE5OTEwMH0.fEkrAitcDRrRiBQsnMip97vOLVmOliSSkzokD3JDuhE";

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: true,
        detectSessionInUrl: false
    }
});