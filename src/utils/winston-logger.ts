import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: winston.format.json(),
    }),
  ],
});

export default logger;
