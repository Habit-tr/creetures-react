import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xrinzjsqsfarjyupbckx.supabase.co";

export default createClient(
  supabaseUrl,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaW56anNxc2Zhcmp5dXBiY2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyMTY0MTUsImV4cCI6MTk5ODc5MjQxNX0.djAf1T_OKYaWMRQ1tJIDIVbXyu8jfdZnit_TmoBujXo'
);
