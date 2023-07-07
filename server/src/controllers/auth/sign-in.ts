import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const signInUser: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password ,
  })
  
  if (error) {
    res.send(error)
  } else {
    res.send(data.session)
  }
}

export default signInUser;