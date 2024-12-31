/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'www.sixt.com',
      'vvzgamnsmfhcoyntclxw.supabase.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig
