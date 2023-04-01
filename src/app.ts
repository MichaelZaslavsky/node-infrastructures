import express from "express";
import rateLimit from "express-rate-limit";
import rateLimitConfig from "./rateLimitConfig.json";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { basicAuthMiddleware } from "./middleware/basicAuthMiddleware";
import cacheRoutes from "./routes/cacheRoutes";
import contactRoutes from "./routes/contactRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

const app = express();

const limiter = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.maxRequests,
});

app.use(limiter);
app.use(basicAuthMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(logger);
app.use(cacheRoutes);
app.use(contactRoutes);
app.use(errorHandler);

export default app;
