import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middleware/errorMiddleware';
import { apiRateLimiter } from './middleware/rateLimiter';
import { AppError } from './utils/appError';
import { ENV } from './config/env';
import path from 'path';

const app: Application = express();

// Serve static uploads for local dev fallback
app.use('/uploads', express.static(path.resolve(__dirname, '../public/uploads')));

// Security HTTP headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api', apiRateLimiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1', routes);

// Handle unhandled routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Centralized error handler
app.use(errorHandler);

export default app;
