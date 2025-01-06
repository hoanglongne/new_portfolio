/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals.push({
      'react-three-fiber': 'react-three-fiber',
      'three': 'three',
    })
    return config
  },
}

module.exports = nextConfig 