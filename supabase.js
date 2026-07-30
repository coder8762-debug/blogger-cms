const SUPABASE_URL = "https://vuzwaowbtmezrxspsoud.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1endhb3didG1lenJ4c3Bzb3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MTEzMjksImV4cCI6MjEwMDk4NzMyOX0.rZ4CVoL4wEvfPPkR2HLdMhi8z4hwrDxGynFRRpTdf4s";

window.db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("Supabase Connected");
