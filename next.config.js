/** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa');

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
    },
    images: {
        domains: [
            'boighor-content.s3.ap-southeast-1.amazonaws.com',
            'bangladhol.com',
            'd1b3dh5v0ocdqe.cloudfront.net'
        ],
        formats: ['image/webp']
    },
    experimental: {
        outputStandalone: true
    }
};

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
