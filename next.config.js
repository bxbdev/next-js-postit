/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },
  transpilePackages: ['supports-color'],

  // Add the following lines:
  // serverComponents: {
  //   debugTraceMode: true,
  // },
}

module.exports = nextConfig
