import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const toxicPlantsByAnimal: RequestHandler = async (req, res) => {
  const { data, error } = await 
  sbDatabase().from("plants").select().is(req.params.animal === 'cats' ? 'toxic_cats' : 'toxic_dogs', req.params.toxicity)

  handleResponse(res, data, error)
}

export default toxicPlantsByAnimal;