import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const verifyOtpEmail: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.verifyOtp({
    email: req.body.email,
    token: req.body.token,
    type: 'email',
  })
  console.log('verify email', data)
  if (error) {
    res.send(error)
  } else {
    res.send(data)
  }
}

export default verifyOtpEmail;