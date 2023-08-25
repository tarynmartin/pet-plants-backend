import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const searchForPlants: RequestHandler = async (req, res) => {
  const { data, error } = await sbDatabase().from("plants").select().textSearch('search_plants', req.params.search)
 
  handleResponse(res, data, error);
}

export default searchForPlants;