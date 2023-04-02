import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import rateLimitConfig from "./rate-limit-config.json";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { basicAuthMiddleware } from "./middleware/basic-auth-middleware";
import cacheRoutes from "./routes/cache-routes";
import contactRoutes from "./routes/contact-routes";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./middleware/logger";

const app = express();

const limiter = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.maxRequests,
});

app.use(cors());

app.use(limiter);
app.use(basicAuthMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(logger);
app.use(cacheRoutes);
app.use(contactRoutes);
app.use(errorHandler);

export default app;
