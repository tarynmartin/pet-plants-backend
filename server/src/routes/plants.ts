import express from 'express'
import listPlants from "../controllers/plants/list-plants";
import scrapePlants from "../controllers/plants/scrape-plants";

const plantRoutes = express.Router()

plantRoutes.get("/", listPlants);
plantRoutes.get("/scrape", scrapePlants);

export default plantRoutes;