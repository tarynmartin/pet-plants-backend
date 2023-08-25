import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const verifyOtpPhone: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.verifyOtp({
    phone: req.body.phone,
    token: req.body.token,
    type: 'sms',
  })
]  if (error) {
    res.send(error)
  } else {
    res.send(data)
  }
}

export default verifyOtpPhone;