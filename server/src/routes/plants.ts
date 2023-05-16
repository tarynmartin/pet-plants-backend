import express from 'express'
import listPlants from "../controllers/plants/list-plants";
import getPlantByID from '../controllers/plants/get-plant';
import searchForPlants from '../controllers/plants/search-plants';
import toxicPlants from '../controllers/plants/toxic-plants'
import toxicPlantsByAnimal from '../controllers/plants/toxic-plants-by-animal';

const plantRoutes = express.Router()

plantRoutes.get("/", listPlants);
<<<<<<< HEAD
plantRoutes.get('/:id', getPlantByID);
plantRoutes.get('/search/:search', searchForPlants)
plantRoutes.get('/toxicity/:toxicity', toxicPlants)
plantRoutes.get('/:animal/:toxicity', toxicPlantsByAnimal)
=======
// plantRoutes.get("/:id", getPlant);
plantRoutes.get("/scrape", scrapePlants);
plantRoutes.post("/", addPlant);
>>>>>>> master

export default plantRoutes;