import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const phoneOtpSignIn: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signInWithOtp({
    phone: req.body.phone,
    options: {
      shouldCreateUser: false
    }
  })
  console.log('otp phone sign in', data)
  if (error) {
    res.send(error)
  } else {
    res.send(data)
  }
}

export default phoneOtpSignIn;