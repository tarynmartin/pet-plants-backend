import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const signOutUser: RequestHandler = async(req, res) => {
  const { error } = await sbDatabase().auth.signOut()
  
  if (error) {
    res.send(error)
  } else {
    res.send('signed out')
  }
}

export default signOutUser;