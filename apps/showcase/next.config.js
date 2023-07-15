/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['yt3.ggpht.com', 'upload.wikimedia.org'],
  },
};

module.exports = nextConfig;
