import { RequestHandler } from "express";
import fbService from "../../lib/firebase";

const listPlants: RequestHandler = async (req, res) => {

  const snapshot = await fbService().db.collection("plants").get();
  let results = {};
  snapshot.forEach((doc: any) => {
    results = {
      ...results,
      [doc.id]: doc.data(),
    };
    // console.log(doc.id, '=>', doc.data());
  });

  // console.log("plants: ", data);

  res.status(200).json(results);
}

export default listPlants;