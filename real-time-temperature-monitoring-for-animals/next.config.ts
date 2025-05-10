// filepath: c:\University\UPB\os2\project\Real-Time-Temperature-Monitoring-for-Animals\real-time-temperature-monitoring-for-animals\next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*', // Proxy to backend
      },
    ];
  },
};

export default nextConfig;