/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },
  externals: {
    // Add any problematic dependencies here
    'supports-color': 'supports-color'
  }
}

module.exports = nextConfig
