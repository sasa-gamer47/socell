/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  future: { webpack5: true },
  fallback: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      's.gravatar.com',
      'th.bing.com',
      'www.bing.com',
      'www.google.com',
      'api.cloudinary.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  babel: {
    requireConfigFile: false,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
      child_process: false,
    }

    return config;
  },

}
