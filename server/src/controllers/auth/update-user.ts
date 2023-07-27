import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const updateUser: RequestHandler = async(req, res) => {
  const { data: user, error } = await sbDatabase().auth.admin.updateUserById(req.body.id, { password: req.body.newPassword })
  console.log('update user', user, error)
  if (error) {
    res.send(error)
  } else {
    res.send(user)
  }
}

export default updateUser;