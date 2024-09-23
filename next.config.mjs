/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  experimental: {
    windowHistorySupport: true,
  },
};

export default nextConfig;
