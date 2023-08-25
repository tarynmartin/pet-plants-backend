import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const verifyOtpEmail: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.verifyOtp({
    email: req.body.email,
    token: req.body.token,
    type: 'email',
  })
  
  handleResponse(res, data, error);
}

export default verifyOtpEmail;