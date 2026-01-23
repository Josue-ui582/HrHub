import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import { router as authRoutes } from "./routes/auth.routes.js";
import presenceRoutes from "./routes/presence.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/presence", presenceRoutes)

export default app;