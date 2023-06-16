import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const signInWithGoogle: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.signInWithOAuth({
    provider: 'google',
  })
  
  if (error) {
    res.send(error)
  } else {
    res.send(data)
  }
}

export default signInWithGoogle;