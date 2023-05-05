import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";

const toxicPlantsByAnimal: RequestHandler = async (req, res) => {
const { data, error } = await 
sbDatabase().from("plants").select().is(req.params.animal === 'cats' ? 'toxicCats' : 'toxicDogs', req.params.toxicity)
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
}

export default toxicPlantsByAnimal;