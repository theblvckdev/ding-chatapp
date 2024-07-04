import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app: Express = express();

app.use(express.json());
app.use(cors({ origin: true }));

const PORT = process.env.PORT || 3000;

// api routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
