/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Changed from 'export' to 'standalone'
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['localhost'], // Add any other domains you're loading images from
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bufferutil: false,
        'utf-8-validate': false,
      };
    }
    return config;
  },
  // Add this to handle potential API routes in static export
  rewrites: async () => {
    return [];
  },
};

module.exports = nextConfig;
