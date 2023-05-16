import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";

const searchForPlants: RequestHandler = async (req, res) => {
const { data, error } = await 
sbDatabase().from("plants").select().textSearch('search_plants', req.params.search)
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
}

export default searchForPlants;