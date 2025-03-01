import express from "express";
const router = express.Router();
import {SubmitLocation,GetPlaces} from '../controllers/locationController.js';

router.post('/submit',SubmitLocation); 
router.get('/places',GetPlaces); 

export default router ;