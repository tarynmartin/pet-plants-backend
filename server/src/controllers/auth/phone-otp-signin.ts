import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const phoneOtpSignIn: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signInWithOtp({
    phone: req.body.phone,
    options: {
      shouldCreateUser: false
    }
  })
  
  handleResponse(res, data, error)
}

export default phoneOtpSignIn;