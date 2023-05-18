// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// import supabase from "../src/utils/supabaseClient.tsx";
import { createClient } from "https://deno.land/x/supabase/mod.ts";
const supabase = createClient(
  "https://xrinzjsqsfarjyupbckx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaW56anNxc2Zhcmp5dXBiY2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyMTY0MTUsImV4cCI6MTk5ODc5MjQxNX0.djAf1T_OKYaWMRQ1tJIDIVbXyu8jfdZnit_TmoBujXo",
);
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl!, supabaseKey!);

// import { type SupabaseClientOptions } from "https://deno.land/x/supabase@1.3.1/src/lib/types.ts";
// definition: { schema?: string; headers?: { [key: string]: string; }; autoRefreshToken?: boolean; persistSession?: boolean; detectSessionInUrl?: boolean; localStorage?: SupabaseAuthClientOptions["localStorage"]; realtime?: RealtimeClientOptions; }

// import { type UserCredentials } from "https://deno.land/x/supabase@1.3.1/mod.ts";
// userCredentials: https://deno.land/x/supabase@1.3.1/mod.ts?s=UserCredentials

console.log(`Function "refreshCycle" up and running!`);

serve(async (req: Request): Promise<Response> => {
  // This is needed if you're planning to invoke your function from a browser.
  // if (req.method === 'OPTIONS') {
  //   return new Response('ok', { headers: corsHeaders })
  // }

  //handle the basic request:
  try {
    supabase.auth.setAuth(
      req.headers.get("Authorization")!.replace("Bearer ", ""),
    );

    const { name } = await req.json();
    console.log("name is: ", name);

    // //try to fetch from database:
    const { data, error } = await supabase
      .from("commitments")
      .select("isActive");

    console.log("fetched ", data.length, " records");
    console.log("supabase error is: ", error);

    //return response
    return new Response(JSON.stringify({ data, error }), {
      headers: {
        // Authorization: `Bearer ${gem}`, //authorization probably need to be on the await supabase line
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
