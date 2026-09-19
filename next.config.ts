import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: '/api/uploads/**' },
      { pathname: '/gallery/**' },
      { pathname: '/New gallery/**' },
      { pathname: '/logo.png' },
      { pathname: '/hero-background.jpg' },
      { pathname: '/banner/**' },
      { pathname: '/artist-portrait.png' },
      { pathname: '/family/**' },
      { pathname: '/books/**' },
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
