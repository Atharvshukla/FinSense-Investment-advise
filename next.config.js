/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer, isEdgeRuntime }) => {
    // Exclude problematic modules from Edge Runtime
    if (isEdgeRuntime) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'regenerator-runtime': false,
        '@babel/runtime': false, // Exclude regenerator-runtime
        'utf-8-validate': false,      // Exclude utf-8-validate
        'bufferutil': false,          // Exclude bufferutil
      };
    }

    // Avoid issues with Edge Runtime by disabling certain modules
    config.externals = [
      ...(config.externals || []),
      'canvas', // Disable canvas for Edge Runtime
      'jsdom',  // Disable jsdom for Edge Runtime
    ];

    // Remove Babel loader configuration
    // Ensure other loaders are configured as needed

    // Add a fallback for Node.js modules if not running on the server
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;