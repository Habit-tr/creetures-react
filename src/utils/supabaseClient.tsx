import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
console.log(supabaseUrl);
console.log(supabaseKey);

export default createClient(supabaseUrl!, supabaseKey!);
