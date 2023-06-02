/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let service: SupabaseClient<any, "public", any> | null = null;

const supabaseService = () => {
  if(service === null){
    console.log("initializing the supabase service.");
    const url = process.env.projectURL;
    const key = process.env.serviceKey;

    if (!url || !key) throw new Error('missing supabase credentials');
    
    //TODO: create this file, based on supabase-example.json, and then paste in real values from supabase
    const supabase = createClient(url, key);
    service = supabase;
  }

  return service;
};

export default supabaseService;
