import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const toxicPlants: RequestHandler = async (req, res) => {
  const { data, error } = await sbDatabase().from("plants").select().is('toxic_cats, toxic_dogs', req.params.toxicity)
  
  handleResponse(res, data, error);
}

export default toxicPlants;