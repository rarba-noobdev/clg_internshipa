/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'images-na.ssl-images-amazon.com',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'images.amazon.com',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'media-amazon.com',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'in.static.webuy.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'images.clerk.dev',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;