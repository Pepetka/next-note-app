/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: true,
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
