/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import serviceAccount from './supabase-service-account.json';

let service: SupabaseClient<any, "public", any> | null = null;

const supabaseService = () => {
  if(service === null){
    console.log("initializing the supabase service.");
    
    //TODO: create this file, based on supabase-example.json, and then paste in real values from supabase

    const supabase = createClient(serviceAccount.projectUrl, serviceAccount.serviceKey);
    service = supabase;
  }

  return service;
};

export default supabaseService;
