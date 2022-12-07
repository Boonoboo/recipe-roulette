/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['img.hellofresh.com'],
  }
}

module.exports = nextConfig
