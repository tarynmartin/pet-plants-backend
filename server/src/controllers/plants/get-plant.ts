import { RequestHandler } from "express";
import sbDatabase from "../../lib/supabase-node-ts";

const getPlantById: RequestHandler = async (req, res) => {
const { data: plants, error } = await sbDatabase().from("plants").select().eq('id', req.params.id);
  if (error) {
    res.send(error);
  } else {
    res.send(plants);
  }
}

export default getPlantById;