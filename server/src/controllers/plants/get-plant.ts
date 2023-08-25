import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const getPlantById: RequestHandler = async (req, res) => {
  const { data: plants, error } = await sbDatabase().from("plants").select().eq('id', req.params.id);

  handleResponse(res, plants, error)
}

export default getPlantById;