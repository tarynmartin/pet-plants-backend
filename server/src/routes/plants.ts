import express from 'express'
import listPlants from "../controllers/plants/list-plants";
import scrapePlants from "../controllers/plants/scrape-plants";
import addPlant from "../controllers/plants/add-plant";

const plantRoutes = express.Router()

plantRoutes.get("/", listPlants);
// plantRoutes.get("/:id", getPlant);
plantRoutes.get("/scrape", scrapePlants);
plantRoutes.post("/", addPlant);

export default plantRoutes;