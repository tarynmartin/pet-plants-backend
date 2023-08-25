import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const signInWithGoogle: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signInWithOAuth({
    provider: 'google',
  })
  
  handleResponse(res, data, error);
}

export default signInWithGoogle;