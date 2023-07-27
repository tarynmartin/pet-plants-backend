import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";

const updateUser: RequestHandler = async(req, res) => {
  const { data: sessionData, error: sessionError} = await sbDatabase().auth.setSession({
    access_token: req.body.access,
    refresh_token: req.body.refresh,
  })
  console.log('set session', sessionData, sessionError)
  const { data, error } = await sbDatabase().auth.updateUser({
    password: req.body.newPassword
  })
  console.log('update user', data, error)
  if (error) {
    res.send(error)
  } else if (sessionError) {
    res.send(sessionError)
  } else {
    res.send(data)
  }
}

export default updateUser;