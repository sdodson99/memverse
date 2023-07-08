/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['yt3.ggpht.com'],
  },
};

module.exports = nextConfig;
