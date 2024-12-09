// logger.ts
import winston from 'winston';

// Configure the logger
const logger = winston.createLogger({
  level: 'info', // Minimum level of logs to record
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),  // Output to the console
    new winston.transports.File({ filename: 'logs/test.log' })  // Output to a file
  ],
});

export default logger;
