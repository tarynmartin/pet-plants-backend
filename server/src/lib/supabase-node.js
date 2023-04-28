/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { createClient } = require("@supabase/supabase-js");

let service = null;

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

exports.database = supabaseService;
