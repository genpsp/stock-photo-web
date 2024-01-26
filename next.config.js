/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  compiler: {
    emotion: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
