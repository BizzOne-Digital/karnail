import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sukhkhokhar.com' }],
        destination: 'https://www.sukhkhokhar.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sukhkhokharmysteryart.vercel.app' }],
        destination: 'https://www.sukhkhokhar.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    localPatterns: [
      { pathname: '/api/uploads/**' },
      { pathname: '/gallery/**' },
      { pathname: '/new-gallery/**' },
      { pathname: '/New gallery/**' },
      { pathname: '/logo.png' },
      { pathname: '/logo-burgundy.jpg' },
      { pathname: '/logo-burgundy.png' },
      { pathname: '/images/**' },
      { pathname: '/hero-background.jpg' },
      { pathname: '/banner/**' },
      { pathname: '/artist-portrait.png' },
      { pathname: '/family/**' },
      { pathname: '/books/**' },
      { pathname: '/blog/**' },
      { pathname: '/media-coverage/**' },
      { pathname: '/favicon.png' },
      { pathname: '/placeholder-artwork.svg' },
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
