import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const listPlants: RequestHandler = async (req, res) => {
  const { data: plants, error } = await sbDatabase().from("plants").select("*");
  if (error) {
    res.send(error);
  } else {
    res.send(plants.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}));
  }
}

export default listPlants;