import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { connectDB } from '@/lib/mongodb';
import { errorHandler, notFoundHandler } from './utils/apiResponse';

import authRoutes from './routes/authRoutes';
import pageRoutes from './routes/pageRoutes';
import serviceRoutes from './routes/serviceRoutes';
import galleryRoutes from './routes/galleryRoutes';
import contentRoutes from './routes/contentRoutes';

let app: express.Express | null = null;

function createApp(): express.Express {
  const server = express();

  server.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  server.use(mongoSanitize());
  server.use(cookieParser(config.cookieSecret));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { success: false, message: 'Too many requests, please try again later.' },
  });
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: 'Too many login attempts, please try again later.' },
  });

  server.use('/api', limiter);
  server.use('/api/auth/login', loginLimiter);

  server.use(express.json({ limit: '10mb' }));
  server.use(express.urlencoded({ extended: true, limit: '10mb' }));

  server.use(async (_req, _res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      next(error);
    }
  });

  server.use('/api/auth', authRoutes);
  server.use('/api/pages', pageRoutes);
  server.use('/api/services', serviceRoutes);
  server.use('/api/gallery', galleryRoutes);
  server.use('/api', contentRoutes);

  server.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
  });

  server.use(notFoundHandler);
  server.use(errorHandler);

  return server;
}

export function getExpressApp(): express.Express {
  if (!app) {
    app = createApp();
  }
  return app;
}
