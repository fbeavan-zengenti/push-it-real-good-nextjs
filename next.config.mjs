/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["www.contensis.com"] },
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
