import express from "express";
import createUser from "../controller/createUser.controller";

const router = express.Router();

// Authentication endpoints
router.post("/sign-up", createUser);

export default router;
