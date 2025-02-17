// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            // Configure allowed origins if needed
            // allowedOrigins: ['your-domain.com'],
            bodySizeLimit: '100mb' // Adjust based on your needs
        },
        serverComponentsExternalPackages: [
            'youtube-dl-exec',
            'child_process'
        ]
    },
    output: 'standalone',
};

export default nextConfig;