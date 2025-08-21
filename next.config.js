/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  //output: 'export',
  basePath: '/Arun-portfolio',
  assetPrefix: '/Arun-portfolio/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
