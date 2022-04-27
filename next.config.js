/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  future: { webpack5: true },
  fallback: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      's.gravatar.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}
