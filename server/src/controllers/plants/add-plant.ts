import { RequestHandler } from "express";
import fbService from "../../lib/firebase";

const addPlant: RequestHandler = async (req, res) => {
  console.log('request', req.body);
  const docRef = await fbService().db.collection('plants').add(req.body);
  res.status(201).json({message: `item added: ${docRef.id}`});
}

export default addPlant;