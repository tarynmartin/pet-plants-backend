import { RequestHandler } from "express";
import sbDatabase  from "../../lib/supabase-node-ts";
import { handleResponse } from '../helpers';

const signUpUser: RequestHandler = async(req, res) => {
  const { data: session, error } = await sbDatabase().auth.signUp({
    email: req.body.email,
    password: req.body.password ,
    options: {
      data: {
        phone_number: req.body.phone,
        terms_agreement: req.body.agreement,
      }
    }
  })
  
  handleResponse(res, session, error);
}

export default signUpUser;