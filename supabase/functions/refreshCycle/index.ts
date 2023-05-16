// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Hello from Functions!");

// const runEdgeFunction = async () => {
//   try {
//     const response = await fetch('YOUR_EDGE_FUNCTION_URL');
//     const result = await response.json();
//     console.log('Edge function result:', result);
//   } catch (error) {
//     console.error('Error running Edge function:', error);
//   }
// };

// runEdgeFunction();

serve(async (req: Request): Promise<Response> => {
  const { name } = await req.json();
  console.log(name);
  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
