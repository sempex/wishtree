import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['special-meme-9x5wjj6v7jjf64g-3000.app.github.dev', 'localhost:3000']
    }
  }
};

export default nextConfig;
