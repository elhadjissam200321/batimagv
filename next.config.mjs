/** @type {import('next').NextConfig} */
// Force rebuild - v1.0.2
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
