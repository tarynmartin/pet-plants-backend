/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const supabase = require("../lib/supabase-node.js");
const scraper = require("./scraper.js");

const catsURL = 'https://www.aspca.org/pet-care/animal-poison-control/cats-plant-list';
const dogsURL = 'https://www.aspca.org/pet-care/animal-poison-control/dogs-plant-list';

//Sampling the data for testing.
const sampleStart = 0;
const sampleCount = 5;

const loadFamilies = async (database) => {
  const response = await database.from("plant_families").select("*");
  const families = response.data;
  console.log("existing family count", families.length);
  return families;
}

const scrape = async (url) => {
  const database = supabase.database();
  let families = await loadFamilies(database);

  console.log("-- getting page links --");
  const links = await scraper.getPageLinks(url);

  //slice the list to get only the sample size.
  const sampleLinks = links.slice(sampleStart, sampleCount);

  console.log("-- getting plant data --");
  for(let i = 0; i < sampleLinks.length; i++){
    
    const link = sampleLinks[i];
    const data = await scraper.getPlantFromLink(link);

    //Check for an existing plant
    const dupeResponse = await database.from("plants").select("*").eq("scientificName", data.scientificName);
    if(dupeResponse.data?.length > 0){
      //we already have this plant (via the scientific name)
      console.log("skipping existing plant", data.scientificName);
      continue;
    }

    //check for an existing family
    if(data.family){
      let existingFamily = families.find(f => f.name === data.family);
      console.log("existing family", existingFamily);

      if(!existingFamily){
        console.log("adding new family: ", data.family);
        const response = await database.from("plant_families").insert({ name: data.family });
        
        //TODO: response doesn't include the new ID, so need to re-query the families table to get the newly added family.
        console.log("insert family response", response);
        //reload the families, and find the newly added one
        families = await loadFamilies(database);
        existingFamily = families.find(f => f.name === data.family);
      }

      //modify the data to include the family ID
      console.log("assigning the plant family id", existingFamily.id);
      
      //fix-up the family for the database
      data.familyId = existingFamily.id; //add the id      
    }

    delete data.family;   //remove the family field (the table has familyId)

    //Fix-up the popular names so it is just a string
    data.popularNames = data.popularNames.join(",");
    
    console.log(`adding plant ${data.name} to database`);
    const addResponse = await database.from("plants").insert(data);
    console.log("add plant response status", addResponse.status, addResponse.statusText);
    if(addResponse.error){
      console.log("add plant error", addResponse.error, addResponse, data);
    }

  }
};

try{
  const actions = [
    scrape(catsURL),
    // scrape(dogsURL),
  ];

  Promise.all(actions).then(() => {
    process.exit(0);
  });

}
catch(err){
  console.log("error", err);
}