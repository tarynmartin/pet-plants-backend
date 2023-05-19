/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let service: SupabaseClient<any, "public", any> | null = null;

const supabaseService = () => {
  if(service === null){
    console.log("initializing the supabase service.");
    
    //TODO: create this file, based on supabase-example.json, and then paste in real values from supabase
    const serviceAccountFilePath = "./supabase-service-account.json";
    const creds = require(serviceAccountFilePath);

    const supabase = createClient(creds.projectUrl, creds.serviceKey);
    service = supabase;
  }

  return service;
};

export default supabaseService;
