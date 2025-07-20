import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Disable source maps in production for memory savings
  productionBrowserSourceMaps: false,
  
  // Enable compression
  compress: true,
}

export default nextConfig
