import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const updateUser: RequestHandler = async(req, res) => {
  const { data: user, error } = await sbDatabase().auth.admin.updateUserById(req.body.id, { password: req.body.newPassword })
  
  handleResponse(res, user, error);
}

export default updateUser;