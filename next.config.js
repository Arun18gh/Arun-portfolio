/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',               // Required for static export
  images: { unoptimized: true },  // GitHub Pages doesn’t support Next.js image optimization
  basePath: '/Arun-portfolio',    // 👈 must match your repo name exactly
  assetPrefix: '/Arun-portfolio/', 
}

module.exports = nextConfig;
