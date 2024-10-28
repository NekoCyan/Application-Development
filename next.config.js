const externalConfig = require('./externalConfig');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/client',
                permanent: true,
            },
            {
                // Match any path that doesn't start with 'client' or 'admin' and the other
                source: `/:path((?!client|admin|${externalConfig.mainMatcher}|${externalConfig.antiRedirectMatcher}).*)`,
                destination: '/client/:path*', // Append '/client' to the matched path
                permanent: true,
            },
        ]
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        config.module.rules.push({
            test: /\.(jpg|png|svg|gif)$/,
            type: 'asset/resource',
        })

        // Important: return the modified config
        return config
    },
}

module.exports = nextConfig