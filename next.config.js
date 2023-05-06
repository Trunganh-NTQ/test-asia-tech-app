/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    PORT: 3001,
  },
};

module.exports = nextConfig;
