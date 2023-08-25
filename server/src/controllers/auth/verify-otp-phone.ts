import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const verifyOtpPhone: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.verifyOtp({
    phone: req.body.phone,
    token: req.body.token,
    type: 'sms',
  })
  
  handleResponse(res, data, error);
}

export default verifyOtpPhone;