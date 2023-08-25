import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const searchFilterPlants: RequestHandler = async (req, res) => {
  const { data, error } = await sbDatabase().from("plants").select().textSearch('search_plants', req.params.search).eq(req.params.animal === 'cats' ? 'toxic_cats' : 'toxic_dogs', req.params.toxicity)

  handleResponse(res, data, error)
}

export default searchFilterPlants;