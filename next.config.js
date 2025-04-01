/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/services/:path*",
        destination: `${process.env.BACKEND_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
