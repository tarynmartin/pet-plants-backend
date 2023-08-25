import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const emailOtpSignIn: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signInWithOtp({
    email: req.body.email,
    options: {
      shouldCreateUser: false
    }
  })
  
  handleResponse(res, data, error)
}

export default emailOtpSignIn;