const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 's3.amazonaws.com',
      //   port: '',
      //   pathname: '/my-bucket/**',
      // },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
};

module.exports = nextConfig;
