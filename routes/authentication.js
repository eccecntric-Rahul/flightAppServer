import express from "express";
import signUp ,{login} from "../controllers/authenticationController";

const router = express.Router();

router.post("/signup",signUp);
router.get("/login",login);

module.exports= router;