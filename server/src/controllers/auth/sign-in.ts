import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const signInUser: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password ,
  })
  
  handleResponse(res, data, error);
}

export default signInUser;