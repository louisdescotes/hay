import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const SEVEN_DAYS = 60 * 60 * 24 * 7
const THIRTY_DAYS = 60 * 60 * 24 * 30

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactCompiler: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
    minimumCacheTTL: THIRTY_DAYS,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/images/**' },
    ],
  },

  experimental: {
    optimizePackageImports: ['motion', '@blossom-carousel/react'],
  },

  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${SEVEN_DAYS}, stale-while-revalidate=86400`,
          },
        ],
      },
    ]
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
