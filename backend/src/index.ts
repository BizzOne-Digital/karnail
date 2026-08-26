import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config';
import { connectDatabase } from './config/database';
import { ensureUploadDirs } from './services/uploadService';
import { errorHandler, notFoundHandler } from './utils/apiResponse';

import authRoutes from './routes/authRoutes';
import pageRoutes from './routes/pageRoutes';
import serviceRoutes from './routes/serviceRoutes';
import galleryRoutes from './routes/galleryRoutes';
import contentRoutes from './routes/contentRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app = express();

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (origin === config.frontendUrl) return callback(null, true);
      // Allow any localhost port in development (Next.js may use 3001, 3002, etc.)
      if (!config.isProduction && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(mongoSanitize());
app.use(cookieParser(config.cookieSecret));

// Rate limiting
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

app.use('/api', limiter);
app.use('/api/auth/login', loginLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '../uploads'), {
    maxAge: '7d',
    setHeaders: (res) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
    },
  })
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api', contentRoutes);
app.use('/api/uploads', uploadRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  ensureUploadDirs();
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    console.log(`Frontend URL: ${config.frontendUrl}`);
    console.log(`Uploads served at: http://localhost:${config.port}/uploads`);
  });
}

startServer().catch(console.error);

export default app;
