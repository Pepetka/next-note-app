/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
