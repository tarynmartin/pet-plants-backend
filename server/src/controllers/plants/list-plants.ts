import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";

const listPlants: RequestHandler = async (req, res) => {
const { data: plants, error } = await sbDatabase().from("plants").select("*");
  if (error) {
    res.send(error);
  } else {
    res.send(plants);
  }
}

export default listPlants;