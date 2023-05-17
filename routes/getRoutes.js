import express from "express";
import getCitiesController from "../controllers/getCityController";
import getFlightController from "../controllers/getFlightController";
const router = express.Router();

router.get("/cities",getCitiesController);
router.get("/flight",getFlightController);

module.exports= router;