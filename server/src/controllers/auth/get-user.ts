import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const getUserInfo: RequestHandler = async(req, res) => {
  const { data: { user }, error } = await sbDatabase().auth.getUser()
  console.log('get user', user)
  if (error) {
    res.send(error)
  } else {
    res.send(user)
  }
}

export default getUserInfo;