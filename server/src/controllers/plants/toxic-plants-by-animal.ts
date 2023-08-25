import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const toxicPlantsByAnimal: RequestHandler = async (req, res) => {
  console.log('check', req.body, req.params);
  if (req.body.search) {
    const { data, error } = await sbDatabase().from("plants").select().textSearch('search_plants', req.body.search).eq(req.params.animal === 'cats' ? 'toxic_cats' : 'toxic_dogs', req.params.toxicity)

    handleResponse(res, data, error)
  } else {
    const { data, error } = await 
    sbDatabase().from("plants").select().is(req.params.animal === 'cats' ? 'toxic_cats' : 'toxic_dogs', req.params.toxicity)

    handleResponse(res, data, error)
  }
}

export default toxicPlantsByAnimal;