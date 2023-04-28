/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { createClient } = require("@supabase/supabase-js");

let service = null;

const supabaseService = () => {
  if(service === null){
    console.log("initializing the supabase service.");
    const creds = require("./supabase-service-account.json");
    const supabase = createClient(creds.projectUrl, creds.serviceKey);
    service = supabase;
  }

  return service;
};

exports.database = supabaseService;
