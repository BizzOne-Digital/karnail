export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sukh_khokhar_mystery_art',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.FRONTEND_URL || 'http://localhost:3000',
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
  isProduction: process.env.NODE_ENV === 'production',
};
