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
    
  //   // Add module rules for handling specific cases
  //   config.module = {
  //     ...config.module,
  //     rules: [
  //       ...(config.module?.rules || []),
  //       {
  //         test: /\.(js|jsx|ts|tsx)$/,
  //         exclude: /node_modules/,
  //         use: {
  //           loader: 'babel-loader',
  //           options: {
  //             presets: ['next/babel'],
  //           },
  //         },
  //       },
  //     ],
  //   };

  //   return config;
  // },
};

module.exports = nextConfig;
