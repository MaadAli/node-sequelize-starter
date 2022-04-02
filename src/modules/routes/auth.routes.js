import authValidation from '../validators/auth.validator';
import express from "express";
import { validate } from 'express-validation';
import controller from "../controllers/auth.controller";
import { authenticateToken } from '../../middleware/isAuthenticated';

const router = express.Router();

router.post('/login', controller.login)

router.post("/createUser", validate(authValidation.createUser), controller.createUser);


  
module.exports = router;
