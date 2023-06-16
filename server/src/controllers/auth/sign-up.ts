import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const signUpUser: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signUp({
    email: req.body.email,
    password: req.body.password ,
  })
  
  if (error) {
    res.send(error)
  } else {
    res.send(data.session)
  }
}

export default signUpUser;