import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sukh_khokhar_mystery_art',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieSecret: process.env.COOKIE_SECRET || 'dev-cookie-secret',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_APP_PASSWORD || '',
  },
  adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || 'Sukh2@live.com',
  adminSeedEmail: process.env.ADMIN_SEED_EMAIL || 'admin@sukhkhokharmysteryart.com',
  adminSeedPassword: process.env.ADMIN_SEED_PASSWORD || 'ChangeMe123!',
  maxUploadSizeMb: parseInt(process.env.MAX_UPLOAD_SIZE_MB || '10', 10),
  uploadBasePath: process.env.UPLOAD_BASE_PATH || 'uploads',
  isProduction: process.env.NODE_ENV === 'production',
};

export const uploadDirs = {
  pages: 'pages',
  services: 'services',
  gallery: 'gallery',
  testimonials: 'testimonials',
  blogs: 'blogs',
  products: 'products',
  settings: 'settings',
} as const;

export type UploadDir = (typeof uploadDirs)[keyof typeof uploadDirs];
