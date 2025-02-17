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
  runtime: 'nodejs', // Use Node.js runtime instead of Edge
  webpack: (config, { isServer, isEdgeRuntime }) => {
    if (isEdgeRuntime) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'regenerator-runtime': false,
        'utf-8-validate': false,
        'bufferutil': false,
      };
    }

    // Avoid issues with Edge Runtime by disabling certain modules
    config.externals = [
      ...(config.externals || []),
      'canvas', // Disable canvas for Edge Runtime
      'jsdom',  // Disable jsdom for Edge Runtime
    ];

    // Ensure Babel is correctly applied to all JS/TS files
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });

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