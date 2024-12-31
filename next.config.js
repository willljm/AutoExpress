/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'www.sixt.com',
      'vvzgamnsmfhcoyntclxw.supabase.co',
      'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig
