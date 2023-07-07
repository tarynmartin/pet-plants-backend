import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const emailOtpSignIn: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signInWithOtp({
    email: req.body.email,
    options: {
      shouldCreateUser: false
    }
  })
  console.log('otp email sign in', data)
  if (error) {
    res.send(error)
  } else {
    res.send(data)
  }
}

export default emailOtpSignIn;