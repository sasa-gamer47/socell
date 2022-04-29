/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  future: { webpack5: true },
  fallback: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      's.gravatar.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },


  // remove babel config to use next default config
  // babel: {
  //   presets: [
  //     [
  //       '@babel/preset-env',
  //       {
  //         targets: {
  //           node: 'current',
  //         },
  //       },
  //     ],
  //   ],
  // },

  babel: {
    requireConfigFile: false,
  }

}
