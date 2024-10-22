/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === "production",
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
