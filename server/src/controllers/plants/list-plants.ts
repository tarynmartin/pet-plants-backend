import { RequestHandler } from "express";
<<<<<<< HEAD
import sbDatabase from "../../lib/supabase-node-ts";

const listPlants: RequestHandler = async (req, res) => {
const { data: plants, error } = await sbDatabase().from("plants").select("*");
=======
import sbDatabase  from "../../lib/supabase-node-ts";


const listPlants: RequestHandler = async (req, res) => {
  const { data: plants, error } = await sbDatabase().from("plants").select("*");
>>>>>>> master
  if (error) {
    res.send(error);
  } else {
    res.send(plants);
  }
}

export default listPlants;