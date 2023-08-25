import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const getUserInfo: RequestHandler = async(req, res) => {
  const { data: { user }, error } = await sbDatabase().auth.getUser()
  
  handleResponse(res, user, error);
}

export default getUserInfo;