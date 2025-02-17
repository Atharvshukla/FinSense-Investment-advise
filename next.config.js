/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  experimental: {
    appDir: true, // Ensures App Router works
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: { 
    unoptimized: false, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // ✅ Force Next.js to use Node.js runtime (NOT Edge)
  runtime: 'nodejs', 

  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       bufferutil: false,
  //       'utf-8-validate': false,
  //       fs: false,
  //       net: false,
  //       tls: false,
  //       child_process: false,
  //     };
  //   }

  //   config.externals = [...(config.externals || []), 'canvas', 'jsdom'];

  //   config.module.rules.push({
  //     test: /\.(js|jsx|ts|tsx)$/,
  //     exclude: /node_modules/,
  //     use: {
  //       loader: 'babel-loader',
  //       options: {
  //         presets: ['next/babel'],
  //       },
  //     },
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
