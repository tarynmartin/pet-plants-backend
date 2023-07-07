import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const updateUser: RequestHandler = async(req, res) => {
  const { data, error } = await sbDatabase().auth.updateUser({
    password: req.body.newPassword
  })
  console.log('data', data)
  if (error) {
    res.send(error)
  } else {
    res.send(data)
  }
}

export default updateUser;